> Đây là nơi tổng hợp những gì đã học được trong suốt quá trình làm project

## Nestjs

- Khác với express, nestjs là framework được tích hợp nhiều thứ hơn, đặc biệt phải nói đến cấu trúc project
- nhiều sự hỗ trợ hơn, khiến việc tự động hóa tốt hơn, khiến mình tập trung hơn vào những vấn đề chính

- Thế nhưng chính việc nó được hỗ trợ nhiều, và mình có những chỗ mình chỉ cần phần nhánh, làm mình khó tiếp cận ban đầu
- Khó có thể nắm bắt được cái gốc khi dùng mức cao ở phần cành
- Tất nhiên là đỡ tốn thời gian hơn hồi mình học nodejs với express, vì mình đã có nền, và mình cũng tập trung hơn, dồn sự tập trung khi một buổi cứ ngồi 4 tiếng như này

- Mình cảm thấy lí do để ở trường chỉ tiếp xúc với nodejs, hay express, hay những thứ cơ bản, là để mình hiểu cái gốc. Những thứ thực ở ngoài, người ta tạo ra sản phẩm, nó ở phần trên cao, phần thân, thậm chí lên tới cành cấp 1, cành cấp 2, có thể cao hơn. Nhưng chỉ cần mình nắm được phần lõi, dù ít dù nhiều, câu chuyện học cái mới sẽ là dễ hơn cả. Khi biết rằng người ta làm những thứ này là có lí do, và người ta cũng là con người, cũng suy luận chứ không phải tự dưng trên trời rớt xuống.

- Dần, mình hiểu được logic, hiểu được ngữ cảnh tạo ra nestjs, và hiểu được từng chút những gì người ta bỏ vào cái framework này. Nó làm mình dễ thở hơn khi bám gốc.


## Prisma
- Chắc chắn nó có phần giống với Entity framework.
- Nhưng phải nói đến cái đặc biệt của Prisma
- Nó tạo ra sự thay đổi từ trong cái module được viết sẵn
- Tức là nó sẽ tự cải tạo module có sẵn của nó để phù hợp với model của mình
- Còn nhớ cái lúc mà mình dùng ```prisma.user```, sau khi mình tạo model, và dùng lệnh ```npx prisma generate``` thì prisma tự tạo ra những thứ còn lại, vô cùng thuận tiện cho mình

- Cách viết example của prisma cũng rất tổng quát, mình nhận ra điều đó khi mình đọc document của nestjs về việc hướng dẫn sự dụng prisma. Việc đẩy nó tổng quát quá sẽ khiến mình khó nhìn nhận được mục đích từ lúc đầu. Nhưng dần dần, mình thích nghi từng chút và khá lên, và hiểu hơn cái tư duy đó.

- Sự tích hợp của Prisma làm mình phải wow, khi tất cả những gì mình cần import là PrismaService, và mình có thể thao tác với mọi model từ đó


## Controller và Sevice - vấn đề của return {statusCode}
- Hiện tại, phương án tốt nhất mình có là viết return trong service, và có lỗi thì xử lí ở đó luôn
- Còn controller, đối với mình là một cái giúp gọn mắt khi xem, để xem những cái gì đươc áp dụng cho cái endpoint không: những Guard nào, hay dùng HTTP request nào, có endpoint này có public không,...

- Để return trong service là phương án tuyệt vời nhất mình có cho đến hiện tại

- Mình gặp phải vấn đề với findOne, mình muốn dùng lại hàm này cho các cái khác, nhưng nếu vậy thì không thể return http response được.
- Vậy nên mình đã viết ra một hàm khác, tương tự với findOne, nhưng trả về là kết quả. Từ kết quả đó mới đưa vào các hàm khác, xem xử lí thế nào nếu null, và xử lí thế nào nếu khác null

## Module
-Ôi mẹ ơi, mình nhận ra là:
- ```imports``` là cho module
- ```providers``` là cho service

- vãi ạ, thế mà lúc đó mình bỏ PrismaService vào trong imports, trong khi đúng ra là phải bỏ vào providers vì nó là service. Tự dưng tỉnh lại liền


## Authen
- Tính đến giờ, phần làm mình mất thời gian nhất là authen. Mình cứ loay hoay với passport, guard, xoay xoay xoay xoay mất đâu đó 4 buổi thì phải.
- Mình nhận ra vấn đề rồi cũng sẽ được giải quyết với sự đầu tư về: công sức, thời gian, tính tập trung
- Mình đã thực thi được phần authen với cách đó


## Nhận thức
> Tận dụng những gì đã có được để làm được cái mình muốn

Tận dụng những gì đã có là điều quan trọng, đó cũng là lí đo để người ta dùng cách framework có sẵn để phát triển. Cái gì lợi nhất thì làm.


## Sự mù đường trong lúc học và làm
- Trong lúc thực hiện cái project này để học, mình nhận ra có những lúc mình đi trong vô thức
- Làm mà không biết làm để làm gì, rồi tự vùi mình vào một mớ hỗn độn
- Document không dành cho một nhóm đối tượng nhỏ, nó là thứ dành cho toàn bộ người dùng của sản phẩm. Vì thế hãy chỉ lấy và tập trung vào những thứ mình cần để xử lí vấn đề thôi.


## Tiến độ
- Với tiến độ này, mình nghĩ mình có thể học nodejs trong vòng 1 tháng, học đủ để có thể được làm. Đó là ước tính của mình.
- Mặc dù có vẻ từ đầu, mình định nhai hết trong vòng 2 tuần.

- Nhưng tính ra, tới giờ, hết 2 tuần rồi, thì mình đã lên tổng cộng 12 buổi, tương đương cỡ 48 tiếng đồng hồ.

- Sức mình có hạn, nếu mình muốn thêm thì tập trung thêm thôi. Nhưng không cần thiết phải thế. 
- Vì vốn hiện trạng của mình được như giờ là vì mình dành đủ thời gian cho bản thân, để tiếp xúc với bản thân trong khi để mọi thứ khác ở ngoài. 


## Hiện tại:
- Mình cần xem lại code của mình, và trau chuốt khi cần
- Ít nhất đó cũng là thời gian mình ngấm hơn về cách tổ chức code

- Cái Role của mình đang hơi rối cấu trúc nha