'use client';

export default function Loading() {
  let position = 0;
  let innerHeight = 0;

  if (typeof window !== 'undefined') {
    position = window.pageYOffset;
    innerHeight = window.innerHeight;
  }

  return (
    <div
      style={{ top: `${position + innerHeight / 2}px` }}
      className="absolute left-1/2 transform -translate-x-1/2 bg-white opacity-90 rounded-md text-center text-xl p-3 mt-10 mb-10">
      <p>Секундочку...⌛</p>
      <p>Загружаем данные...</p>
    </div>
  );
}
