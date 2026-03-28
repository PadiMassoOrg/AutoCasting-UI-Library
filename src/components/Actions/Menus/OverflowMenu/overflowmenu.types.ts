import type { IconName, IconVariant } from '../../../Brand/Identity/Icon';

export type OverflowMenuActionItem = {
  type?: 'item';
  key: string;
  label: React.ReactNode;
  onSelect?: () => void | Promise<void>;
  disabled?: boolean;
  destructive?: boolean;
  iconName?: IconName;
  iconVariant?: IconVariant;
  hidden?: boolean;
  closeOnSelect?: boolean;
};

export type OverflowMenuSeparatorItem = {
  type: 'separator';
  key: string;
};

export type OverflowMenuContentItem = {
  type: 'content';
  key: string;
  content: React.ReactNode;
  hidden?: boolean;
};

export type OverflowMenuItem = OverflowMenuActionItem | OverflowMenuSeparatorItem | OverflowMenuContentItem;

export type OverflowMenuAlign = 'start' | 'end';
export type OverflowMenuSide = 'top' | 'bottom';
