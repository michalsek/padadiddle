import { useMemo, useRef, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { type DropDownProps } from './types';
import { getSelectedLabel } from './utils';

export default function DropDown<TValue extends string = string>({
  options,
  value,
  onChange,
  placeholder = 'Select',
}: DropDownProps<TValue>) {
  const [isOpen, setIsOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const triggerRef = useRef<View>(null);

  const selectedLabel = useMemo(
    () => getSelectedLabel(options, value, placeholder),
    [options, placeholder, value]
  );

  const toggleMenu = () => {
    if (isOpen) {
      setIsOpen(false);
      return;
    }

    setIsOpen(true);

    if (!triggerRef.current?.measureInWindow) {
      setMenuAnchor({ x: 0, y: 0, width: 240, height: 0 });
      return;
    }

    triggerRef.current.measureInWindow((x, y, width, height) => {
      setMenuAnchor({ x, y, width, height });
    });
  };

  return (
    <View style={styles.container}>
      <View collapsable={false} ref={triggerRef}>
        <Pressable testID="dropDownTrigger" style={styles.trigger} onPress={toggleMenu}>
          <Text style={styles.triggerText}>{selectedLabel}</Text>
          <Text style={styles.caret}>{isOpen ? '▲' : '▼'}</Text>
        </Pressable>
      </View>

      <Modal
        transparent
        visible={isOpen}
        animationType="none"
        onRequestClose={() => setIsOpen(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setIsOpen(false)} />
        <View
          style={[
            styles.menu,
            {
              top: menuAnchor.y + menuAnchor.height + 4,
              left: menuAnchor.x,
              width: menuAnchor.width,
            },
          ]}
        >
          <ScrollView nestedScrollEnabled style={styles.menuScroll}>
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <Pressable
                  key={option.value}
                  onPress={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  style={[styles.option, isSelected && styles.optionSelected]}
                >
                  <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 6,
  },
  trigger: {
    borderWidth: 1,
    borderColor: '#d4d4d8',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  triggerText: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
  },
  caret: {
    fontSize: 12,
    color: '#6b7280',
  },
  menu: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: '#d4d4d8',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    zIndex: 1000,
    elevation: 6,
  },
  menuScroll: {
    maxHeight: 240,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  option: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  optionSelected: {
    backgroundColor: '#111827',
  },
  optionText: {
    fontSize: 14,
    color: '#111827',
  },
  optionTextSelected: {
    color: '#ffffff',
    fontWeight: '600',
  },
});
