document.addEventListener('DOMContentLoaded', () => {
    const promptContent = document.getElementById('promptContent');
    const copyBtn = document.getElementById('copyBtn');
    const toast = document.getElementById('toast');

    // Fetch Prompt from Prompt.text
    fetch('Prompt.text')
        .then(response => {
            if (!response.ok) {
                throw new Error('ไม่สามารถโหลดไฟล์ Prompt.text ได้');
            }
            return response.text();
        })
        .then(text => {
            promptContent.textContent = text.trim();
        })
        .catch(error => {
            console.error('Error loading prompt:', error);
            promptContent.textContent = 'ไม่พบข้อความใน Prompt.text กรุณาตรวจสอบไฟล์';
            // Fallback content if fetch fails (e.g. running locally without server)
            const fallbackText = "จงเขียนเอกสารข้อตกลงในการพัฒนางาน (PA) สำหรับตำแหน่งครู วิทยฐานะชำนาญการพิเศษ วิชาการงานอาชีพ ชั้นประถมศึกษาปีที่ 6 โรงเรียนเทศบาลท่าอิฐ โดยนำเสนอผลงานในรูปแบบที่ทันสมัย เน้นการประยุกต์ใช้ความรู้ด้านเทคโนโลยีและนวัตกรรมการศึกษา และวิศวกรรมคอมพิวเตอร์และปัญญาประดิษฐ์ มาใช้ในการจัดการเรียนการสอนเพื่อพัฒนาทักษะอาชีพของนักเรียนให้สอดคล้องกับยุคดิจิทัล";
            promptContent.textContent = fallbackText;
        });

    // Copy to Clipboard
    copyBtn.addEventListener('click', () => {
        const text = promptContent.textContent;
        navigator.clipboard.writeText(text).then(() => {
            showToast();
        }).catch(err => {
            console.error('Failed to copy: ', err);
            // Fallback for older browsers
            const textArea = document.createElement("textarea");
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showToast();
        });
    });

    function showToast() {
        toast.style.display = 'block';
        setTimeout(() => {
            toast.style.display = 'none';
        }, 3000);
    }
});
