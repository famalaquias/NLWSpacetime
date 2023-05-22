/* todo arquivo que termine com png é um
arquivo que posso importar; */
declare module '*.png';

declare module "*.svg" {
  import React from 'react';
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}
