# system_monitor.py
import sys
import psutil
import time
from datetime import datetime
from PyQt6.QtWidgets import (QApplication, QMainWindow, QWidget, QVBoxLayout, 
                            QPushButton, QProgressBar, QLabel)
from PyQt6.QtCore import QTimer, Qt
import sqlite3
import os

class SystemMonitor(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("System Resource Monitor")
        self.setMinimumSize(500, 400)
        
        # Initialize database
        self.db_path = 'system_metrics.db'
        self.init_database()
        
        # Initialize recording state
        self.is_recording = False
        self.record_start_time = None
        
        # Create central widget and layout
        central_widget = QWidget()
        self.setCentralWidget(central_widget)
        layout = QVBoxLayout(central_widget)
        
        # Create progress bars and labels
        self.cpu_label = QLabel("CPU Usage: 0%")
        self.cpu_bar = QProgressBar()
        self.ram_label = QLabel("RAM Usage: 0%")
        self.ram_bar = QProgressBar()
        self.disk_label = QLabel("Disk Usage: 0%")
        self.disk_bar = QProgressBar()
        
        # Create record button and timer label
        self.record_button = QPushButton("Start Recording")
        self.record_button.clicked.connect(self.toggle_recording)
        self.timer_label = QLabel("Recording Time: 00:00:00")
        self.timer_label.setVisible(False)
        
        # Add widgets to layout
        for widget in [
            self.cpu_label, self.cpu_bar,
            self.ram_label, self.ram_bar,
            self.disk_label, self.disk_bar,
            self.record_button, self.timer_label
        ]:
            layout.addWidget(widget)
            
        # Style the progress bars
        for bar in [self.cpu_bar, self.ram_bar, self.disk_bar]:
            bar.setStyleSheet("""
                QProgressBar {
                    border: 2px solid grey;
                    border-radius: 5px;
                    text-align: center;
                }
                QProgressBar::chunk {
                    background-color: #007bff;
                    width: 10px;
                    margin: 0.5px;
                }
            """)
        
        # Set up update timer
        self.update_timer = QTimer()
        self.update_timer.timeout.connect(self.update_metrics)
        self.update_timer.start(1000)  # Update every second

    def init_database(self):
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS system_metrics (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                cpu_usage REAL,
                ram_usage REAL,
                disk_usage REAL,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        conn.commit()
        conn.close()
    
    def get_system_metrics(self):
        cpu = psutil.cpu_percent(interval=None)
        ram = psutil.virtual_memory().percent
        disk = psutil.disk_usage('/').percent if os.name == 'posix' else psutil.disk_usage('C:\\').percent
        return cpu, ram, disk
    
    def update_metrics(self):
        cpu, ram, disk = self.get_system_metrics()
        
        # Update progress bars and labels
        self.cpu_bar.setValue(int(cpu))
        self.cpu_label.setText(f"CPU Usage: {cpu:.1f}%")
        
        self.ram_bar.setValue(int(ram))
        self.ram_label.setText(f"RAM Usage: {ram:.1f}%")
        
        self.disk_bar.setValue(int(disk))
        self.disk_label.setText(f"Disk Usage: {disk:.1f}%")
        
        # Record metrics if recording is active
        if self.is_recording:
            self.record_metrics(cpu, ram, disk)
            self.update_timer_display()
    
    def record_metrics(self, cpu, ram, disk):
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO system_metrics (cpu_usage, ram_usage, disk_usage) VALUES (?, ?, ?)",
            (cpu, ram, disk)
        )
        conn.commit()
        conn.close()
    
    def toggle_recording(self):
        self.is_recording = not self.is_recording
        
        if self.is_recording:
            self.record_start_time = datetime.now()
            self.record_button.setText("Stop Recording")
            self.timer_label.setVisible(True)
        else:
            self.record_start_time = None
            self.record_button.setText("Start Recording")
            self.timer_label.setVisible(False)
    
    def update_timer_display(self):
        if self.record_start_time:
            elapsed = datetime.now() - self.record_start_time
            hours = int(elapsed.total_seconds() // 3600)
            minutes = int((elapsed.total_seconds() % 3600) // 60)
            seconds = int(elapsed.total_seconds() % 60)
            self.timer_label.setText(
                f"Recording Time: {hours:02d}:{minutes:02d}:{seconds:02d}"
            )

def main():
    app = QApplication(sys.argv)
    app.setStyle('Fusion')
    window = SystemMonitor()
    window.show()
    sys.exit(app.exec())

if __name__ == '__main__':
    main()