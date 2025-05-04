FROM python:3.11-slim

# ติดตั้ง tesseract และ lib ที่ OpenCV ต้องใช้
RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    tesseract-ocr-tha \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    libgl1 \
    && apt-get clean

# ตั้ง working directory
WORKDIR /app

# คัดลอกโค้ด
COPY . /app

# ติดตั้ง dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# เริ่มต้นแอป
CMD ["python", "app.py"]

