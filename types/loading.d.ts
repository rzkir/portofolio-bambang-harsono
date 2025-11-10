type LoadingType = "projects" | "contacts" | "general";

interface LoadingContextType {
  isLoading: boolean;
  loadingMessage: string;
  loadingType: LoadingType;
  showLoading: (message?: string, type?: LoadingType) => void;
  hideLoading: () => void;
  isInitialLoading: boolean;
}

// PixelTransition
interface PixelTransitionProps {
  firstContent: React.ReactNode;
  secondContent: React.ReactNode;
  gridSize?: number;
  pixelColor?: string;
  animationStepDuration?: number;
  className?: string;
  style?: CSSProperties;
  aspectRatio?: string;
  trigger?: "auto" | "hover" | "click";
}

interface LoadingOverlayProps {
  isLoading?: boolean;
  message?: string;
  className?: string;
}

interface MangcodingStyleSplashProps {
  isLoading: boolean;
  message?: string;
  messages?: string[];
  messageDurationsMs?: number | number[];
  loop?: boolean;
  mode?: "messages-only" | "full";
  textEffect?: "fade" | "typewriter" | "slide";
  typewriterSpeedMs?: number;
  typewriterHoldMs?: number;
  onSequenceComplete?: () => void;
  className?: string;
}
