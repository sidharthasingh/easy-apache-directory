# Easy Apache Dir.
The apache directory listing is a great technique to buffer you files over the internet. But the greatest drawback that one faces is the UI. Yes, The UI may look good on the Desktop, but is not-so-good for the mobile interface. Through this, project, we provide a mobile-web UI for the apache directory listing.

# Apache changes
### There are few cahnges that have to be made to the apache server that yoou are running.

>## Apache.conf
In this file, which is located in "/etc/apache2/", change the permissions of directory (default is "/var/www/") to the directory of your choice (Example: "/home/myName/")

>## 000-default.conf
In this file, which on linux is located in "/etc/apache2/sites-available/", change the directory (default is /var/www/html) to a directory that lies inside the directory that was set while editing Apache.conf. 

>## Cross-Origin Header
By default, Apache is configured to block the cross-origin requests, the functionality on which this app works. So to enable that, i.e, To add the CORS authorization to the header using Apache, simply add the following line inside either the <Directory>, <Location>, <Files> or <VirtualHost> sections of your server config (usually located in a *.conf file, such as httpd.conf or apache.conf), or within a .htaccess file. Or simply add this at the end of the "Apache2.conf" file.

Header set Access-Control-Allow-Origin "*"

If you want to embed images, this is how you do it:

![Image of Yaktocat](/desktop.png)