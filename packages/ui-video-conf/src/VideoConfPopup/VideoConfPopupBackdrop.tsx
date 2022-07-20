import type { ReactNode } from 'react';
import React from 'react';
import { Box } from '@rocket.chat/fuselage';
import { css } from '@rocket.chat/css-in-js';

const backdropStyle = css`
  position: fixed;
  top: 0;
  right: 0;
  min-width: 276px;
`;

const VideoConfPopupBackdrop = ({ children }: { children: ReactNode }) => <Box m='x40' className={backdropStyle}>{children}</Box>

export default VideoConfPopupBackdrop;
