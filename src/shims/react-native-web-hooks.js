/**
 * React 19.2-compatible replacement for react-native-web-hooks
 *
 * The original react-native-web-hooks uses findDOMNode which was removed
 * in React 19. This shim provides the same API using modern ref patterns.
 */
import {useState, useEffect, useCallback} from 'react';
import {Platform, Dimensions, PixelRatio} from 'react-native';

// Modern pseudo hook using ref.current directly (no findDOMNode)
function createPseudoHook({events}) {
  return function (ref) {
    if (Platform.OS !== 'web') {
      return false;
    }

    const [isActive, setActive] = useState(false);

    useEffect(() => {
      const node = ref && ref.current;
      if (!node) {
        return;
      }

      const [eventIn, eventOut] = events;
      const onStart = () => setActive(true);
      const onEnd = () => setActive(false);

      node.addEventListener(eventIn, onStart);
      node.addEventListener(eventOut, onEnd);

      if (eventOut === 'mouseup') {
        document.addEventListener(eventOut, onEnd, false);
      }

      return () => {
        document.removeEventListener(eventOut, onEnd, false);
        node.removeEventListener(eventIn, onStart);
        node.removeEventListener(eventOut, onEnd);
      };
    }, [ref && ref.current]);

    return isActive;
  };
}

export const useActive = createPseudoHook({events: ['mousedown', 'mouseup']});
export const useFocus = createPseudoHook({events: ['focus', 'blur']});
export const useHover = createPseudoHook({
  events: ['mouseenter', 'mouseleave'],
});

export function useDimensions() {
  const [dimensions, setDimensions] = useState({
    window: Dimensions.get('window'),
    screen: Dimensions.get('screen'),
  });

  useEffect(() => {
    const onChange = ({window, screen}) => {
      setDimensions({window, screen});
    };
    const subscription = Dimensions.addEventListener('change', onChange);
    return () => subscription?.remove();
  }, []);

  return dimensions;
}

export function useScaledSize(multiple) {
  const {
    window: {width},
  } = useDimensions();
  let size = 16;
  if (width >= 1408) size = 24;
  else if (width >= 1216) size = 22;
  else if (width >= 1024) size = 20;
  else if (width >= 768) size = 18;
  return size * multiple;
}

export function useLayout() {
  const [layout, setLayout] = useState({x: 0, y: 0, width: 0, height: 0});
  const onLayout = useCallback((e) => setLayout(e.nativeEvent.layout), []);
  return {onLayout, ...layout};
}

export function useREM(multiple) {
  return PixelRatio.getFontScale() * 16 * multiple;
}

export function getNode(ref) {
  return ref && ref.current ? ref.current : null;
}

export function Hoverable({children, onHoverIn, onHoverOut}) {
  const [isHovered, setHovered] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setHovered(true);
    onHoverIn?.();
  }, [onHoverIn]);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    onHoverOut?.();
  }, [onHoverOut]);

  if (Platform.OS !== 'web') {
    return typeof children === 'function' ? children(false) : children;
  }

  return typeof children === 'function' ? children(isHovered) : children;
}

export function Resizable({children}) {
  const dimensions = useDimensions();
  return typeof children === 'function' ? children(dimensions) : children;
}
