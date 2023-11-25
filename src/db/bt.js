// import React, { useState } from 'react';
// import { View, Text, Button } from 'react-native';
// import BluetoothEscposPrinter from 'react-native-bluetooth-escpos-printer';

// const PrinterScreen = () => {
//   const [isConnected, setIsConnected] = useState(false);

//   const handleConnectBluetooth = async () => {
//     try {
//       const devices = await BluetoothEscposPrinter.getDeviceList();
//       const device = devices[0];
//       const connectSuccess = await BluetoothEscposPrinter.connect(device.address);
//       if (connectSuccess) {
//         setIsConnected(true);
//         console.log('Connected to printer:', device.name);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <View>
//       <Button title="Connect Bluetooth" onPress={handleConnectBluetooth} />
//       {isConnected && <Text>Connected to printer!</Text>}
//     </View>
//   );
// };

// export default PrinterScreen;