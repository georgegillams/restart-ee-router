To fake a display in Raspbian:


Install `xserver-xorg-video-dummy`:

```
sudo apt-get install xserver-xorg-video-dummy
```

Create `xorg.conf`:
```
sudo vi /usr/share/X11/xorg.conf.d/xorg.conf
```

Add the following to the newly created file:

```
Section "Device"
    Identifier  "Configured Video Device"
    Driver      "dummy"
EndSection

Section "Monitor"
    Identifier  "Configured Monitor"
    HorizSync 31.5-48.5
    VertRefresh 50-70
EndSection

Section "Screen"
    Identifier  "Default Screen"
    Monitor     "Configured Monitor"
    Device      "Configured Video Device"
    DefaultDepth 24
    SubSection "Display"
    Depth 24
    Modes "1024x800"
    EndSubSection
EndSection
```

Restart
```
sudo reboot
```
