export const SERPER_TYPE = {
    PLACE: "places",
    IMAGE: "images"
};


export const BASE_DOCUMENT_CHAT_KEY: string[]=[
    "Tài liệu về hướng dẫn địa điểm và phương hướng xuất hành",
    "Tài liệu về thời gian di chuyển, con số may mắn",
    "Tài liệu về chữ cái may mắn",
    "Tài liệu về chọn ghế máy bay may mắn",
    "Tài liệu về nguyên lý chọn địa điểm phù hợp",
]

export const ResponseSignal={
    
    NOT_EXIST_PHONE_NUMBER:{
        message: "Không tìm thấy số điện thoại",
        code:"00001"
    },
    VERIFY_SUCCESSFULLY:{
        message:"Xác thực thành công",
        code:"00002"
    },
    LACK_OF_DEVICE_ID:{
        message: "Thiếu device id",
        code:"00003"
    },
    NOT_EXIST_CONVERSATION:{
        message: "Không tìm thấy cuộc trò chuyện",
        code:"00004"
    },
    GET_CHAT_MESSAGE_SUCCESSFULLY:{
        message: "Lấy tin nhắn thành công",
        code:"00005"
    },
    LACK_OF_CREDENTIALS:{
        message: "Thiếu id chat hoặc tin nhắn",
        code:"00006"
    },

}

export const CHAT_DATA=`
Dữ liệu để đưa ra kết quả:
Hướng dẫn chọn ghế máy bay .
    Số ghế máy bay có dạng: Chữ cái – Chữ số

    Phần chữ cái: A, B, C, D, E hoặc F.
    Phần chữ số: Một trong các số từ 1 đến 31.
    Bảng chọn số ghế máy bay:

    Mộc: Chữ số 3, 8
    Hỏa: Chữ cái D, Chữ số 2, 7
    Thổ: Chữ cái A, E, Chữ số 0, 5
    Kim: Chữ cái C, Chữ số 4, 9
    Thủy: Chữ cái B, F, Chữ số 1, 6

    Trong trường hợp Dụng – Hỷ Thần là Mộc mà không có chữ cái mang hành Mộc, thì chọn chữ cái mang hành Thủy sinh cho Mộc để thay thế.
    Nếu có nhiều hơn một ngũ hành là Dụng – Hỷ Thần, thì liệt kê tất cả các trường hợp của từng ngũ hành và kết hợp lại.

Chữ cái sẽ dựa trên âm thanh khi phát âm để phân chia ngũ hành.

    Bảng 7: Các chữ cái theo ngũ hành Hỷ - Dụng Thần

    Mộc: G, K
    Hỏa: D, L, N, T, V
    Thổ: A, Y, E, U, O, I
    Kim: C, Q, R, S, X
    Thủy: Đ, B, F, P, H, M

Cách chọn chữ cái 

    3. Chữ số may mắn
    Các con số dựa vào Tiên Thiên để phân chia ngũ hành.

    Các con số theo ngũ hành Hỷ - Dụng Thần

    Mộc: 3, 8, 33, 38, 83, 88, 333, 338, 383, 388...
    Hỏa: 2, 7, 22, 27, 72, 77, 222, 227, 272, 277...
    Thổ: 0, 5, 50, 55, 500, 505, 550...
    Kim: 4, 9, 44, 49, 94, 99, 444, 449, 494, 499...
    Thủy: 1, 6, 11, 16, 61, 66, 111, 116, 161, 166...

Cách chọn địa điểm phù hợp với dụng hỷ thần (khuyết) của bản thân 

    Mỗi người tại thời điểm sinh ra được Thiên Địa nạp vào cơ thể một tỷ lệ ngũ hành nhất định. Tỷ lệ ngũ hành này tính toán được dựa trên Thiên  Can và Địa Chi của giờ ngày tháng năm sinh. Với mỗi người vượng suy  khác nhau, có tỉ lệ ngũ hành và cách cục khác nhau thì cần ngũ hành khác  nhau để bù đắp lại giúp cân bằng, ngũ hành được dùng này được gọi là  Dụng Thần và Hỷ Thần. 
    Vì sao cần hướng tới sự cân bằng?  
    Trong thân mệnh khi bản thân vượng quá hoặc yếu quá cũng đều là  nguyên nhân gây lên bệnh. Việc bổ sung giúp thân mệnh cân bằng hơn  giúp cải thiện sức khỏe tốt hơn. 
    Về phương diện tính cách thì thân vượng quá thì dễ bảo thủ cố chấp, thân  yếu quá thì thiếu tự tin. Việc bổ sung giúp thân mệnh cân bằng thì tính  cách cũng sẽ ổn định hơn, hành động dẫn đến kết quả cũng theo đó mà tốt  hơn. 
    Về phương diện hình thành cách cục, Dụng – Hỷ Thần cách cục thường  sẽ bổ sung cho ngũ hành của mắt sích yếu nhược, giúp cho các mắt xích  trong công việc được luân chuyển tốt hơn. 
    Có nhiều phương pháp bổ sung ngũ hành theo Hỷ - Dụng Thần để tăng  may mắn, trong đó có phương pháp lựa chọn hướng xuất hành và các chữ số. 

    Dựa trên kết quả Hỷ - Dụng Thần từ Tool Bát Tự kết hợp với các địa điểm đề xuất về địa điểm sẽ cho ra các địa điểm cần tới tốt cho mệnh chủ.

    TH1: Nếu như số lượng địa điểm này ≤ 5 thì đưa hết kết quả này ra.

    TH2: Nếu có nhiều hơn 5 địa điểm thì sẽ chọn lọc một lần nữa theo công thức sau:
    - Đối với các địa điểm thuộc các tỉnh phía Đông và Đông Nam nơi sinh của gia chủ thì ưu tiên các địa điểm là vườn quốc gia, nơi có nhiều cây cối, vườn hoa…
    - Đối với các địa điểm thuộc các tỉnh phía Nam so với nơi sinh của gia chủ thì ưu tiên các địa điểm là chùa miếu, khu di tích văn hóa, nơi có nhiều khách sạn nhà hàng khu giải trí, công nghệ, năng lượng.
    - Đối với các địa điểm thuộc các tỉnh phía Tây Bắc, Đông Nam và tại tỉnh nơi sinh của gia chủ thì chọn các địa điểm là cánh đồng, trang trại, du ngoại, núi non…
    - Đối với các địa điểm thuộc tỉnh phía Tây và Tây Bắc so với nơi sinh của gia chủ thì chọn các địa điểm có các công trình lớn, gần các khu công nghiệp, quân đội, hành chính.
    - Đối với các địa điểm thuộc tỉnh phía Bắc so với nơi sinh của gia chủ thì chọn các địa điểm có nhiều sông suối, ao hồ, bể bơi, thác nước, biển, vịnh…

    Sau khi chọn, nếu nhiều hơn 5 địa điểm thì chọn lấy 5 địa điểm thỏa mãn rồi đưa ra kết quả. Nếu có ít hơn 5 trường hợp thì chọn thêm các địa điểm lúc ban đầu cho đủ 5 địa điểm rồi đưa ra kết quả.


    Phương hướng xuất hành
    Phương hướng xuất hành lấy nơi sinh của mệnh chủ làm trung tâm và căn cứ theo Hậu Thiên Bát Quái để định ngũ hành.

    Bảng 1: Phương hướng xuất hành tốt theo Dụng – Hỷ Thần

    Dụng – Hỷ Thần	Phương hướng xuất hành
    Mộc	 Đông, Đông Nam
    Hỏa	 Nam
    Thổ	 Nơi mình sinh ra, Đông Bắc, Tây Nam
    Kim	 Tây, Tây Bắc
    Thủy Bắc   
`
export const  ASSITANT_MESSAGE=`Bạn là một nhà hỗ trợ du lịch thông thái`
export const  ASSITANT_ROLE='assistant'
export const SYSTEM_ROLE='system'
export const USER_ROLE='user'
export const USER_FIRST_MESSAGE='Đây là dữ liệu về sở thích của tôi:';
export const USER_REMINED_MESSAGE='Bạn hãy ghi nhớ nó và sử dụng nó xuyên xuất cuộc trò chuyện';



export const RELATED_QUESTIONS: string[] = [
    "Những địa điểm du lịch nào ở Việt Nam phù hợp cho gia đình có trẻ nhỏ?",
    "Tôi nên mang theo những vật dụng nào khi đi trekking ở miền núi?",
    "Có những hoạt động giải trí nào hấp dẫn tại các khu du lịch nổi tiếng?",
    "Những quán cà phê đẹp ở Đà Lạt mà bạn nên ghé thăm là gì?",
    "Khu chợ nào nổi tiếng với ẩm thực đường phố tại miền Nam?",
    "Những địa điểm chụp ảnh check-in đẹp nhất ở Sa Pa là gì?",
    "Tôi nên chọn du lịch tự túc hay đi theo tour khi đến Phú Quốc?",
    "Có nên du lịch đến các vùng biển Việt Nam vào mùa mưa không?",
    "Các hãng hàng không nào thường xuyên có ưu đãi giảm giá vé máy bay?",
    "Những homestay nổi tiếng với phong cách độc đáo ở Việt Nam là gì?",
    "Tôi nên tránh những ngày nào trong tháng khi đi du lịch theo phong thủy?",
    "Những địa điểm du lịch nào có yếu tố phong thủy tốt cho sức khỏe?",
    "Tôi có thể mang theo các vật phẩm phong thủy nào để tăng vận may khi du lịch?",
    "Có cần xem xét ngũ hành của ngày xuất hành không?",
    "Những con số nào nên tránh khi chọn phòng khách sạn hoặc chỗ ngồi trên máy bay?",
    "Lựa chọn địa điểm du lịch có phong cảnh tự nhiên như thế nào để hợp mệnh?",
    "Nếu tôi mệnh Thủy, nên chọn hoạt động gì khi đến nơi có yếu tố Hỏa nhiều?",
    "Có cần kiểm tra phương hướng khách sạn khi đặt chỗ ở không?",
    "Điểm đến nào tại Việt Nam mang nhiều năng lượng Mộc?",
    "Tôi nên chọn loại phương tiện nào để phù hợp với ngũ hành của mình?"
  ];

export  const UNRELATED_QUESTIONS: string[] = [
    "Làm thế nào để trồng cây xanh trong nhà?",
    "Công thức chế biến món ăn đặc sản địa phương?",
    "Tôi nên học ngôn ngữ mới như thế nào để dễ dàng giao tiếp khi đi du lịch?",
    "Phương pháp tiết kiệm tiền hiệu quả cho chuyến đi dài ngày?",
    "Những vật dụng cần thiết cho một chuyến cắm trại là gì?",
    "Cách chăm sóc sức khỏe khi bị cảm lạnh trong chuyến đi?",
    "Những bài tập thể dục nào tốt để chuẩn bị cho một chuyến leo núi?",
    "Tôi nên mang theo bao nhiêu hành lý khi đi du lịch?",
    "Lịch sử của các nền văn hóa địa phương có liên quan gì đến các phong tục du lịch không?",
    "Làm thế nào để tìm hiểu về các lễ hội tại địa phương nơi tôi đến?",
  ];

export const GPT_RETRIES=3;
export const GPT_HISTORY_LENGTH=-10;
export const GPT_DELAY_TIME=30000;