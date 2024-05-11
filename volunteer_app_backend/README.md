# Guide for lib installing with pip-tool

We have 2 files <b>requremenets.in</b> and <b>requirements.txt</b>
При першому запуску треба встановити лібу, активуємо venv i скачуємо лібу
```
pip install pip-tools
```
Щоб встановити всі ліби ми компілюємо файл 
```
pip-compile  # це скомпілює новий файл requirements.txt
```
і після встановлюємо всьо 
```
pip-sync
```

Для того щоб встановити нову лібу, ми вписуємо її назву в <b>requremenets.in</b>
І потім встановлюємо
```shell
pip-compile && pip-sync
```