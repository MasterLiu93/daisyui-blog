/// <reference types="vite/client" />

// 声明JSON模块
declare module '*.json' {
  const value: any;
  export default value;
}
