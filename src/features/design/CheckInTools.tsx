import { useMemo, useState } from 'react';
import { Modal, Text, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Image } from 'expo-image';
import qrcode from 'qrcode-generator';
import { SmallButton, styles, useLiveData } from './live';
import { shareText } from './share';

export function CodeDialog() {
  const { c } = useLiveData();
  const key = 'code:' + c.values.eventId,
    code = c.values[key];
  const [copied, setCopied] = useState(false);
  const source = useMemo(() => {
    if (!code) return '';
    const qr = qrcode(0, 'M');
    qr.addData(code);
    qr.make();
    return qr.createDataURL(6, 24);
  }, [code]);
  return (
    <Modal
      transparent
      visible={!!code && c.values.codeOpen === 'yes'}
      onRequestClose={() => c.setValue('codeOpen', '')}
    >
      <View style={{ flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#0006' }}>
        <View
          style={[
            styles.row,
            { alignItems: 'center', alignSelf: 'center', width: '100%', maxWidth: 350 },
          ]}
        >
          <Text style={styles.title}>Event check-in code</Text>
          {!!source && (
            <Image
              source={{ uri: source }}
              accessibilityLabel="Event check-in QR"
              style={{ width: 208, height: 208 }}
              contentFit="contain"
            />
          )}
          <Text selectable style={styles.body}>
            {code}
          </Text>
          <View style={styles.actions}>
            <SmallButton
              label={copied ? 'Copied' : 'Share code'}
              onPress={() => c.run(async () => setCopied((await shareText(code)) === 'copied'))}
            />
            <SmallButton label="Close" onPress={() => c.setValue('codeOpen', '')} />
          </View>
        </View>
      </View>
    </Modal>
  );
}
export function CheckInScanner() {
  const { c } = useLiveData();
  const [permission, request] = useCameraPermissions();
  const [scan, setScan] = useState(false);
  const [message, setMessage] = useState('');
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#e6f6f7',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
      }}
    >
      {scan && permission?.granted ? (
        <>
          <CameraView
            style={{ width: '100%', flex: 1 }}
            facing="back"
            barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
            onMountError={() => {
              setScan(false);
              setMessage('Camera unavailable. Enter the code below.');
            }}
            onBarcodeScanned={({ data }) => {
              setScan(false);
              const code = data.trim();
              if (/^[0-9a-f-]{36}$/i.test(code)) {
                c.setValue('checkinCode', code);
                setMessage('Code scanned. Tap Submit to check in.');
              } else setMessage('Scan the QR shown by the organizer.');
            }}
          />
          <SmallButton label="Enter code manually" onPress={() => setScan(false)} />
        </>
      ) : (
        <>
          <SmallButton
            label="Scan event QR"
            onPress={() =>
              c.run(async () => {
                const allowed = permission?.granted || (await request()).granted;
                setScan(!!allowed);
                setMessage(allowed ? '' : 'Camera access is off. Enter the organizer’s code below.');
              })
            }
          />
          {!!message && <Text style={styles.body}>{message}</Text>}
        </>
      )}
    </View>
  );
}
