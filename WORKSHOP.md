# Workshop

This page: https://bit.ly/3wt9PM4

- KPN Things Portal (sign up for Freemium account): https://portal.kpnthings.com/
- Device Simulator App
    - Android: https://play.google.com/store/apps/details?id=com.kpn.iot.thingsdeviceapp
    - iOS: https://apps.apple.com/us/app/kpn-things-device-simulator/id1591616919
- KPN Things Portal documentation: https://docs.kpnthings.com/portal
- Developer manual: https://docs.kpnthings.com/dm
- SenML documentation: https://docs.kpnthings.com/dm/concepts/senml
- ThingsML documentation: https://docs.kpnthings.com/dm/processing/thingsml
- Webhook (receive messages without setting up a server): https://webhook.site
- tiny-asset-tracker (Free demo asset tracking web application): https://github.com/kpn-iot/tiny-asset-tracker
- Node LTS (16.x): https://nodejs.org/en/download/ or on Mac use `brew install nvm && nvm install 16`
- NPM 8.x is included with Node
- Azure CLI: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli or on Mac use `brew install azure-cli`
- Slides from the workshop: Will be added later

Submit light blinking sequence for Streamline:

```
fport:   119
payload: 0107050532
```

# Provision the Device Simulator App

1. Create a Freemium account on KPN Things Portal
2. On the Home page, go to "Add new Device"
3. Select "Device Simulator", enter a name and click "Add device"
4. Install the Device Simulator App on your phone
5. Scan the QR-code with the app
6. Click "Add Network Info" and click "Finish"
7. Go to the tab "Device Twin", click "the Device needs..."
8. Select the flow "My First Flow"
9. Click "Add more Data..." and select "Use all Data"
10. Go back to Device Twin
11. On the tab "Flows", click on "My First Flow"
12. Select "Data Processing" and under "Device Simulator (Mobile Phone app)" enable the decoder and encoder
13. Go back to "My First Flow" and select "Destinations"
14. In a separate tab, go to webhook.site and copy the URL from the screen, not from the URL bar
15. Back on the Portal, add a HTTPS destination with the webhook.site URL you copied
16. Go back to Device Twin
17. On your phone, select "Location" and click "Send data now"
18. In Device Twin, click "Refresh"
19. Follow the steps for the tiny-asset-tracker web app
20. After uploading to Azure Web app, modify the destination for "My First Flow" to the URL returned by Azure CLI.
21. Try sending data from your phone and refreshing the web app hosted on your Azure account.
