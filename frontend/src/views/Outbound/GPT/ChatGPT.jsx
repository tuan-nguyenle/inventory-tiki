import React, { useState } from 'react';
import axios from 'axios';
const { Configuration, OpenAIApi } = require("openai");


function ChatGPT() {
    const [resgpt, setResgpt] = useState(null);
    const [text, settext] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // Thêm biến trạng thái isLoading

    const API_KEY = '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';
    const handleButtonClick = async () => {
        setIsLoading(true); // Bắt đầu gọi API
        const configuration = new Configuration({
            apiKey: API_KEY,
            headers: {
                'User-Agent': 'Mozilla/5.0 kawa kawa',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            }
        });
        const openai = new OpenAIApi(configuration);

        try {
            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: `tôi có danh sách kệ gồm "A1A1, A12B4, A1A2, A1A4, B8A44, C33A12, A55C22 B13A2, B2D54, C32A12 " bạn có thể chia và sắp xếp thứ tự các kệ với quy tắc sau không:
                 Tính theo thứ tự từ trái qua phải , là chữ cái thì sắp xếp tăng dần theo alphabet, là số thì xếp theo thứ tự tăng dần
                Chia danh sách kệ trên thành các list nhỏ, mỗi danh sách gồm tối thiểu 1 kệ và tối đa là 3 kệ
                và chỉ trả json danh sách list đó để lấy API đừng giải thích gì hết đừng đây là.. hay gì hết chỉ tra json thôi`,

                // prompt: `Thời tiết thành phố hồ chí minh hôm nay thế nào. với nhiệt độ này cần làm gì để đảm báo lưu kho được diễn ra an toàn`,



                // prompt: `Hãy đưa ra đánh giá,nhận xét, cũng như đưa ra dự báo trong tương lai đối với những thông tin sau "Nhập kho tháng 1: 120,
                //  Nhập kho tháng 2: 249, Nhập kho tháng 3:500. Xuất kho tháng 1: 12, Xuất kho tháng 2: 49, Xuất kho tháng 3: 90"`,
                temperature: 0.7,
                max_tokens: 1000,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
            });

            const result = response.data.choices[0].text.trim();
            setResgpt(result);
            console.log(result);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false); // Kết thúc gọi API
        }
    };
    const testapi = () => {
        const shelves = [
            "A1A1", "A12B4", "A1A2", "A1A4", "B8A44", "C33A12",
            "A55C22", "B13A2", "B2D54", "C32A12"
        ];

        // chia danh sách kệ thành các danh sách nhỏ
        const chunkSize = 3;
        const shelfChunks = [];
        for (let i = 0; i < shelves.length; i += chunkSize) {
            shelfChunks.push(shelves.slice(i, i + chunkSize));
        }

        // sắp xếp các danh sách nhỏ theo quy tắc
        shelfChunks.forEach(chunk => {
            chunk.sort((a, b) => {
                // chuyển các kệ thành mảng chữ cái và số
                const aArr = a.match(/[a-z]+|\d+/gi);
                const bArr = b.match(/[a-z]+|\d+/gi);

                // so sánh các phần tử theo thứ tự
                for (let i = 0; i < aArr.length && i < bArr.length; i++) {
                    const aEl = aArr[i];
                    const bEl = bArr[i];

                    if (isNaN(aEl) && isNaN(bEl)) { // cả 2 đều là chữ cái
                        if (aEl < bEl) return -1;
                        if (aEl > bEl) return 1;
                    } else if (!isNaN(aEl) && !isNaN(bEl)) { // cả 2 đều là số
                        return aEl - bEl;
                    } else { // trường hợp còn lại
                        return isNaN(aEl) ? 1 : -1;
                    }
                }

                // trường hợp các phần tử còn lại giống nhau
                return aArr.length - bArr.length;
            });
        });

        // trả về kết quả dưới dạng JSON
        const result = { shelves: shelfChunks };
        const jsonResult = JSON.stringify(result);

        settext(jsonResult)
    }
    return (
        <div>
            <button onClick={handleButtonClick}>Test API ChatGPT</button>
            <button onClick={testapi}>Computer</button>
            {isLoading && <h3>Loading...</h3>} {/* Hiển thị trạng thái isLoading */}
            {resgpt && <p>{resgpt}</p>}
            {text && <p>{text}</p>}
        </div>
    );
};
export default ChatGPT;
