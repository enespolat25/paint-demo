// src/App.jsx
import React, { useState, useRef, useEffect } from 'react';

const PaintApp = () => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState('#000'); // Başlangıç rengi siyah
  const [shape, setShape] = useState('free'); // Varsayılan olarak serbest çizim
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const handleMouseDown = (e) => {
      if (shape === 'free') {
        setDrawing(true);
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
      }
    };

    const handleMouseMove = (e) => {
      if (!drawing || shape !== 'free') return;

      ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
      ctx.strokeStyle = color;
      ctx.stroke();
    };

    const handleMouseUp = () => {
      if (shape === 'free') {
        setDrawing(false);
        ctx.closePath();
      }
    };

    const handleMouseLeave = () => {
      if (shape === 'free') {
        setDrawing(false);
        ctx.closePath();
      }
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [drawing, color, shape]);

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleShapeChange = (selectedShape) => {
    setShape(selectedShape);
  };

  const drawShape = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    switch (shape) {
      case 'circle':
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, 2 * Math.PI);
        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.closePath();
        break;
      case 'rectangle':
        ctx.strokeStyle = color;
        ctx.strokeRect(canvas.width / 4, canvas.height / 4, canvas.width / 2, canvas.height / 2);
        break;
      default:
        break;
    }
  };

  const handleSaveClick = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL(); // Canvas içeriğini veri URL'sine dönüştür

    // Bir indirme bağlantısı oluştur ve tıkla
    const downloadLink = document.createElement('a');
    downloadLink.href = dataUrl;
    downloadLink.download = 'drawing.png';
    downloadLink.click();
  };

  return (
    <div>
      <h1>Online Paint Uygulaması</h1>
      <label>
        Renk Seçin:
        <input type="color" value={color} onChange={handleColorChange} />
      </label>
      <label>
        Şekil Seçin:
        <select value={shape} onChange={(e) => handleShapeChange(e.target.value)}>
          <option value="free">Serbest Çizim</option>
          <option value="circle">Daire</option>
          <option value="rectangle">Dikdörtgen</option>
        </select>
      </label>
      <button onClick={drawShape}>Şekli Çiz</button>
      <button onClick={handleSaveClick}>Kaydet</button>
      <canvas ref={canvasRef} width={800} height={600} style={{ border: '1px solid #000' }}></canvas>
    </div>
  );
};

export default PaintApp;
