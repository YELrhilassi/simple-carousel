import { useState } from "react";

import "./style.css";

const items = [
  {
    id: 1,
    text: "01",
  },
  {
    id: 2,
    text: "02",
  },
  {
    id: 3,
    text: "03",
  },
  {
    id: 4,
    text: "04",
  },
  {
    id: 5,
    text: "05",
  },
  {
    id: 6,
    text: "06",
  },
];

export default function App() {
  const [carouselItems, setCarouselItems] = useState(items);
  const [moveClass, setMoveClass] = useState("");

  const handleAnimationEnd = () => {
    if (moveClass === "back") {
      backward();
    } else if (moveClass === "next") {
      forward();
    }
    setMoveClass("");
  };

  const backward = () => {
    setCarouselItems((prev) => {
      const t = [...prev].shift(); // get the first element of the list
      return [...prev.filter((i) => i.id !== t.id), t]; // filter out the first element, and add it to the end
    });
  };

  const forward = () => {
    setCarouselItems((prev) => {
      const t = [...prev].pop(); // get the last element of the list
      return [t, ...prev.filter((i) => i.id !== t.id)]; // filter out the last element, and add it to the start
    });
  };

  // the class is changed first, which causes the carousel to slide first, and after the animation is ended then the item list is shifted
  // the setMoveClass get reset to allow for next input

  return (
    <div className="container">
      <div
        onAnimationEnd={handleAnimationEnd}
        className={`carousel ${moveClass}`}
      >
        {carouselItems.map((item) => (
          <Card key={item.id} text={item.text} />
        ))}
      </div>
      <div className="control">
        <button onClick={() => setMoveClass("back")}>{`<`}</button>
        <button onClick={() => setMoveClass("next")}>{`>`}</button>
      </div>
    </div>
  );
}

function Card({ text }) {
  return (
    <div className="card">
      <p>{text}</p>
    </div>
  );
}
