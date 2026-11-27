import type { ComponentRef,RefObject } from 'react';
import type { View } from 'react-native';
import { File,Paths } from 'expo-file-system';
import { printToFileAsync } from 'expo-print';
import { isAvailableAsync,shareAsync } from 'expo-sharing';
import { captureRef } from 'react-native-view-shot';
import { randomUUID } from 'expo-crypto';
import {reportCsv,reportHtml,type ExportFormat,type ExportRow} from './reportFileContent';
export async function exportReport(format:ExportFormat,title:string,rows:ExportRow[],preview?:RefObject<ComponentRef<typeof View>|null>){
  if(!await isAvailableAsync())throw new Error('Chức năng lưu hoặc chia sẻ tệp chưa sẵn sàng trên thiết bị.');
  let uri:string,mimeType:string;
  if(format==='CSV'){const file=new File(Paths.cache,'ocean-impact-'+randomUUID()+'.csv');file.create();file.write(reportCsv(rows));uri=file.uri;mimeType='text/csv';}
  else if(format==='PDF'){uri=(await printToFileAsync({html:reportHtml(title,rows)})).uri;mimeType='application/pdf';}
  else {if(!preview?.current)throw new Error('Mở bản xem trước để lưu ảnh.');uri=await captureRef(preview,{format:'png',quality:1});mimeType='image/png';}
  try{await shareAsync(uri,{mimeType,dialogTitle:title});}finally{const file=new File(uri);if(file.exists)file.delete();}
}
