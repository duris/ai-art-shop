import { useState, useRef, MouseEvent } from "react";

type Position = {
  x: number;
  y: number;
};

type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

type ResizeData = {
  corner: Corner;
  startX: number;
  startY: number;
  startWidth: number;
  startHeight: number;
};

const ResizableContainer: React.FC = () => {
  const [isResizing, setIsResizing] = useState(false);
  const [resizeData, setResizeData] = useState<ResizeData | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (
    event: MouseEvent<HTMLDivElement>,
    corner: Corner
  ) => {
    setIsResizing(true);
    setResizeData({
      corner,
      startX: event.clientX,
      startY: event.clientY,
      startWidth: containerRef.current?.offsetWidth || 0,
      startHeight: containerRef.current?.offsetHeight || 0,
    });
  };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (isResizing && resizeData) {
      const { corner, startX, startY, startWidth, startHeight } = resizeData;
      const deltaX = event.clientX - startX;
      const deltaY = event.clientY - startY;
      let newWidth = startWidth;
      let newHeight = startHeight;
      let newTop = containerRef.current?.offsetTop || 0;
      let newLeft = containerRef.current?.offsetLeft || 0;

      if (corner === "top-left") {
        newWidth -= deltaX;
        newHeight -= deltaY;
        newTop += deltaY;
        newLeft += deltaX;
      } else if (corner === "top-right") {
        newWidth += deltaX;
        newHeight -= deltaY;
        newTop += deltaY;
      } else if (corner === "bottom-left") {
        newWidth -= deltaX;
        newHeight += deltaY;
        newLeft += deltaX;
      } else if (corner === "bottom-right") {
        newWidth += deltaX;
        newHeight += deltaY;
      }
      if (containerRef.current) {
        containerRef.current.style.width = `${newWidth}px`;
        containerRef.current.style.height = `${newHeight}px`;
        containerRef.current.style.top = `${newTop}px`;
        containerRef.current.style.left = `${newLeft}px`;
      }
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
    setResizeData(null);
  };

  const renderHandle = (corner: Corner, style: React.CSSProperties) => (
    <div
      style={style}
      onMouseDown={(event) => handleMouseDown(event, corner)}
    />
  );

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        top: "50px",
        left: "50px",
        width: "300px",
        height: "300px",
        backgroundColor: "lightgray",
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {renderHandle("top-left", {
        position: "absolute",
        top: "-5px",
        left: "-5px",
        cursor: "nwse-resize",
        width: "10px",
        height: "10px",
      })}
      {renderHandle("top-right", {
        position: "absolute",
        top: "-5px",
        right: "-5px",
        cursor: "nesw-resize",
        width: "10px",
        height: "10px",
      })}
      {renderHandle("bottom-left", {
        position: "absolute",
        bottom: "-5px",
        left: "-5px",
        cursor: "nesw-resize",
        width: "10px",
        height: "10px",
      })}
      {renderHandle("bottom-right", {
        position: "absolute",
        bottom: "-5px",
        right: "-5px",
        cursor: "nwse-resize",
        width: "10px",
        height: "10px",
      })}
    </div>
  );
};

export default ResizableContainer;
