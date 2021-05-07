import { showMessage, hideMessage } from 'react-native-flash-message';

export type TypeFlash = 'success' | 'danger' | 'info' | 'warning' | 'default';
export type PositionFlash = 'top' | 'bottom' | 'center';

interface IFlashMessage {
  type: TypeFlash;
  title: string;
  message: string;
  position?: PositionFlash;
}

const notifyFlashMessage = ({
  type,
  title,
  message,
  position,
}: IFlashMessage) => {
  showMessage({
    message: title,
    description: message,
    type,
    icon: 'auto',
    duration: 5000,
    floating: true,
    position: position || 'top',
  });
};

export default notifyFlashMessage;
