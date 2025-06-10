import { useEffect } from 'react';
import 'D:/Mini Project/4in1/src/components/Task/TaskCss/blossomFall.css';

const BlossomFall = () => {
    useEffect(() => {
        const createBlossoms = () => {
            const numberOfBlossoms = 14;  // Tăng số lượng hoa mai
            for (let i = 0; i < numberOfBlossoms; i++) {
                const blossom = document.createElement('div');
                blossom.classList.add('blossom');

                const randomLeft = Math.random() * window.innerWidth;
                const randomSize = 20 + Math.random() * 20;  // Kích thước ngẫu nhiên từ 20px - 40px
                const randomDuration = 8 + Math.random() * 10;  // Thời gian rơi từ 8 - 18 giây

                blossom.style.left = `${randomLeft}px`;
                blossom.style.width = `${randomSize}px`;
                blossom.style.height = `${randomSize}px`;
                blossom.style.animationDuration = `${randomDuration}s`;

                document.body.appendChild(blossom);
            }
        };

        createBlossoms();

        return () => {
            const blossoms = document.querySelectorAll('.blossom');
            blossoms.forEach(blossom => blossom.remove());
        };
    }, []);

    return null;
};

export default BlossomFall;
