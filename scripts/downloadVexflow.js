#!/usr/bin/env node

const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const https = require('node:https');
const { execFile } = require('node:child_process');
const { promisify } = require('node:util');

const ROOT_DIR = path.resolve(__dirname, '..');
const WORKING_DEPS_PATH = path.join(ROOT_DIR, 'workingDependencies.json');
const VEXFLOW_DIR = path.join(ROOT_DIR, 'vexflow');
const execFileAsync = promisify(execFile);

function downloadFile(url, targetPath) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
          downloadFile(response.headers.location, targetPath).then(resolve).catch(reject);
          response.resume();
          return;
        }

        if (response.statusCode !== 200) {
          reject(new Error(`Request failed (${response.statusCode}) for ${url}`));
          response.resume();
          return;
        }

        const chunks = [];
        response.on('data', (chunk) => chunks.push(chunk));
        response.on('end', async () => {
          try {
            const content = Buffer.concat(chunks);
            await fs.writeFile(targetPath, content);
            resolve();
          } catch (error) {
            reject(error);
          }
        });
      })
      .on('error', reject);
  });
}

async function fetchTagArchive(version, archivePath) {
  const refs = [`v${version}`, version];

  for (const ref of refs) {
    const archiveUrl = `https://codeload.github.com/vexflow/vexflow/tar.gz/refs/tags/${encodeURIComponent(ref)}`;
    try {
      await downloadFile(archiveUrl, archivePath);
      return {
        archiveUrl,
        ref,
      };
    } catch {
      // Try next candidate ref.
    }
  }

  throw new Error(`Could not download vexflow source archive for version ${version}`);
}

async function main() {
  const rawDeps = await fs.readFile(WORKING_DEPS_PATH, 'utf8');
  const deps = JSON.parse(rawDeps);
  const vexflowVersion = deps?.vexflow;

  if (!vexflowVersion || typeof vexflowVersion !== 'string') {
    throw new Error('workingDependencies.json must contain a string field: "vexflow"');
  }

  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'vexflow-source-'));
  const archivePath = path.join(tempDir, 'vexflow.tar.gz');
  const { archiveUrl, ref } = await fetchTagArchive(vexflowVersion, archivePath);

  await fs.rm(VEXFLOW_DIR, { recursive: true, force: true });
  await fs.mkdir(VEXFLOW_DIR, { recursive: true });

  await execFileAsync('tar', ['-xzf', archivePath, '-C', tempDir]);

  const extractedEntries = await fs.readdir(tempDir, { withFileTypes: true });
  const repoDirectory = extractedEntries.find(
    (entry) => entry.isDirectory() && entry.name.startsWith('vexflow-')
  );

  if (!repoDirectory) {
    throw new Error('Downloaded archive did not contain expected vexflow source directory');
  }

  const sourceDir = path.join(tempDir, repoDirectory.name);
  const sourceFiles = await fs.readdir(sourceDir);
  await Promise.all(
    sourceFiles.map((name) => fs.cp(path.join(sourceDir, name), path.join(VEXFLOW_DIR, name), { recursive: true }))
  );

  const meta = {
    package: 'vexflow',
    version: vexflowVersion,
    source: archiveUrl,
    ref,
    downloadedAt: new Date().toISOString(),
  };
  await fs.writeFile(path.join(VEXFLOW_DIR, 'metadata.json'), `${JSON.stringify(meta, null, 2)}\n`);

  await fs.rm(tempDir, { recursive: true, force: true });
  console.log(`Downloaded vexflow source (${ref}) to ${VEXFLOW_DIR}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
