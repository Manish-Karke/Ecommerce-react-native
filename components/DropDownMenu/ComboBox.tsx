import { ComboBoxMenu } from "@/types/type";
import React, { useEffect, useRef, useState } from "react";
import { Modal, Pressable, View } from "react-native";

const ComboBox: React.FC<ComboBoxMenu> = ({
  visible,
  handleOpen,
  handleClose,
  trigger,
  children,
  dropDownWidth = 150,
}) => {
  const triggerRef = useRef<View>(null);

  const [position, setPosition] = useState<{
    x: number;
    y: number;
    width: number;
  }>({
    x: 0,
    y: 0,
    width: 0,
  });

  useEffect(() => {
    if (triggerRef.current && visible) {
      triggerRef.current.measure((_, __, width, height, px, py) => {
        setPosition({
          x: px,
          y: py + height,
          width,
        });
      });
    }
  }, [visible]);

  return (
    <View>
      <View ref={triggerRef}>{trigger}</View>

      <Modal
        transparent
        visible={visible}
        animationType="fade"
        onRequestClose={handleClose}
      >
        {/* Backdrop - closes on press */}
        <Pressable
          className="flex-1"
          onPress={handleClose}
          style={{ backgroundColor: "transparent" }}
        >
          {/* Dropdown content - stops event propagation */}
          <View
            className="absolute bg-white rounded-md p-1 w-full shadow-md elevation-4"
            style={{
              top: position.y,
              left: position.x + position.width / 2 - dropDownWidth / 2,
              width: dropDownWidth,
            }}
            onStartShouldSetResponder={() => true}
            onTouchEnd={(e) => e.stopPropagation()}
          >
            {children}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default ComboBox;
