import sys
import psutil
import time
from datetime import datetime
from PyQt6.QtWidgets import (QApplication, QMainWindow, QWidget, QVBoxLayout, 
                            QPushButton, QLabel, QFrame)
from PyQt6.QtCore import QTimer, Qt
import sqlite3
import os

class SystemMonitor(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Уровень загруженности")
        self.setFixedSize(400, 300)
        
        # Set dark theme
        self.setStyleSheet("""
            QMainWindow {
                background-color: #000000;
                margin: 5px;
            }
            QFrame#wrapper {
                background-color: #000000;
                border: 1px solid #FFFFFF;
                border-radius: 10px;
                margin: 5px;
            }
            QFrame#main_frame {
                background-color: #000000;
                margin: 10px;
            }
            QLabel {
                color: #FFFFFF;
                font-family: monospace;
                font-size: 14px;
                background: transparent;
            }
            QPushButton {
                color: #FFFFFF;
                background-color: #000000;
                border: 1px solid #FFFFFF;
                border-radius: 5px;
                padding: 5px 15px;
                font-family: monospace;
                min-width: 100px;
            }
        """)
        
        # Create wrapper frame
        self.wrapper = QFrame()
        self.wrapper.setObjectName("wrapper")
        self.setCentralWidget(self.wrapper)
        
        # Create main frame
        self.main_frame = QFrame()
        self.main_frame.setObjectName("main_frame")
        
        # Create wrapper layout
        wrapper_layout = QVBoxLayout(self.wrapper)
        wrapper_layout.setContentsMargins(0, 0, 0, 0)
        wrapper_layout.addWidget(self.main_frame)
        
        # Create main layout
        layout = QVBoxLayout(self.main_frame)
        layout.setContentsMargins(20, 20, 20, 20)
        layout.setSpacing(10)
        
        # Create labels
        self.header = QLabel("Уровень загруженности:")
        self.cpu_label = QLabel("ЦП: <Значение>")
        self.ram_label = QLabel("ОЗУ: <Свободно>/<Всего>")
        self.disk_label = QLabel("ПЗУ: <Свободно>/<Всего>")
        
        # Create button and timer
        self.record_button = QPushButton("Начать запись")
        self.timer_label = QLabel("")
        self.timer_label.setAlignment(Qt.AlignmentFlag.AlignCenter)
        
        # Add widgets to layout
        layout.addWidget(self.header)
        layout.addWidget(self.cpu_label)
        layout.addWidget(self.ram_label)
        layout.addWidget(self.disk_label)
        layout.addStretch()
        layout.addWidget(self.record_button, alignment=Qt.AlignmentFlag.AlignCenter)
        layout.addWidget(self.timer_label)
        
        # Keep existing functionality
        self.is_recording = False
        self.record_start_time = None
        self.record_button.clicked.connect(self.toggle_recording)
        
        # Set up update timer
        self.update_timer = QTimer()
        self.update_timer.timeout.connect(self.update_metrics)
        self.update_timer.start(1000)

    def toggle_recording(self):
        self.is_recording = not self.is_recording
        if self.is_recording:
            self.record_start_time = datetime.now()
            self.record_button.setText("Остановить")
        else:
            self.record_start_time = None
            self.record_button.setText("Начать запись")
            self.timer_label.setText("")
    
    def update_timer_display(self):
        if self.record_start_time:
            elapsed = datetime.now() - self.record_start_time
            minutes = int(elapsed.total_seconds() // 60)
            seconds = int(elapsed.total_seconds() % 60)
            self.timer_label.setText(f"{minutes:02d}:{seconds:02d}")

    def get_memory_info(self):
        mem = psutil.virtual_memory()
        free_gb = mem.available / (1024 ** 3)
        total_gb = mem.total / (1024 ** 3)
        return free_gb, total_gb

    def get_disk_info(self):
        disk = psutil.disk_usage('C:\\' if os.name == 'nt' else '/')
        free_gb = disk.free / (1024 ** 3)
        total_gb = disk.total / (1024 ** 3)
        return free_gb, total_gb

    def update_metrics(self):
        # CPU Usage
        cpu = psutil.cpu_percent(interval=None)
        self.cpu_label.setText(f"ЦП: {cpu:.0f}")

        # RAM Usage
        free_ram, total_ram = self.get_memory_info()
        self.ram_label.setText(f"ОЗУ: {free_ram:.0f}/{total_ram:.0f}")

        # Disk Usage
        free_disk, total_disk = self.get_disk_info()
        self.disk_label.setText(f"ПЗУ: {free_disk:.0f}/{total_disk:.0f}")
        
        if self.is_recording:
            self.update_timer_display()

def main():
    app = QApplication(sys.argv)
    window = SystemMonitor()
    window.show()
    sys.exit(app.exec())

if __name__ == '__main__':
    main()