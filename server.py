from PyQt5.QtCore import *
from PyQt5.QtWebEngineWidgets import *
from PyQt5.QtWidgets import QApplication
import sys

if __name__=='__main__':
    app.run()

    qt_app = QApplication(sys.argv)
    web = QWebEngineView()
    web.setWindowTitle("test")
    web.resize(600,400)
    web.load(QUrl('localhost:12345'))
    web.show()
    sys.exit(qt_app.exec_())

