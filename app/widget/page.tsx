'use client';

// 兼容HTTP父页面缺失 crypto.randomUUID，在组件初始化第一时间补齐
if (window.crypto && !window.crypto.randomUUID) {
  window.crypto.randomUUID = function () {
    const arr = new Uint8Array(16);
    crypto.getRandomValues(arr);
    // 符合UUID v4标准规范
    arr[6] = (arr[6] & 0x0f) | 0x40;
    arr[8] = (arr[8] & 0x3f) | 0x80;
    return Array.from(arr, (byte, index) => {
      let hex = byte.toString(16).padStart(2, '0');
      if ([4, 6, 8, 10].includes(index)) hex = '-' + hex;
      return hex;
    }).join('');
  };
}

import ChatPanel from '../components/chat-panel';

export default function Widget() {
  return (
    <div className="h-screen">
      <ChatPanel mode="widget" />
    </div>
  );
}
