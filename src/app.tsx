import { Button, Column, Columns, Rows, Text, TextInput } from "@canva/app-ui-kit";
import { addNativeElement, getCurrentPageContext } from "@canva/design";
import { addPage } from "@canva/preview/design";
import * as React from "react";
import styles from "styles/components.css";
import fetch from 'node-fetch';
import { upload } from "@canva/asset";
import { requestExport } from "@canva/design";

function buildUrl(baseUrl: string, queryParams: Record<string, string>): string {
  const url = new URL(baseUrl);

  // Set or append each query parameter
  Object.entries(queryParams).forEach(([paramName, paramValue]) => {
    url.searchParams.set(paramName, paramValue);
  });

  // Convert the URL object back to a string
  const finalUrl = url.toString();

  return finalUrl;
}

function checkEmptyInputs(inputIds: string[]): boolean {
  
  for (const id of inputIds) {

    const inputElement = document.getElementById(id) as HTMLInputElement;
    if (inputElement) {
      const trimmedValue = inputElement.value.trim();
      if (trimmedValue === '') {
        return true; 
      }
    }
  }
  return false;
}

function parseDecimalInput(input: HTMLInputElement): number {
  const inputValueAsString = input.value.trim();
  const floatValue = Number(inputValueAsString)

  return floatValue;
}

function clearInputTexts(inputIds: string[]) {
  inputIds.forEach((id) => {
    const inputElement = document.getElementById(id) as HTMLInputElement | null;
    if (inputElement) {
      inputElement.value = '';
    }
  });
}

export function App() {

  async function handleClick() {
    
    const inputIds = ['widthVal', 'topVal', 'leftVal', 'heightVal'];

    // qr code positioning
    var width = parseDecimalInput(document.getElementById('widthVal') as HTMLInputElement);
    var height = parseDecimalInput(document.getElementById('heightVal') as HTMLInputElement);
    var left = parseDecimalInput(document.getElementById('leftVal') as HTMLInputElement);  
    var top = parseDecimalInput(document.getElementById('topVal') as HTMLInputElement);

    // Default values taken
    if(checkEmptyInputs(inputIds)){
      width = 123.21259843;   //default width val
      height = 123.21259843;  //default height val
      top = 257.38582677;     //default Y val
      left = 50.267716535;    //default X val
    }

    console.log(width,height,top,left);

    //clearing the text inputs 
    clearInputTexts(inputIds);

    // exporting the main design
    await (async () => {
      const response = await requestExport({
        acceptedFileTypes: ["PNG", "JPG"],
      });

      console.log(response.status);
      if (response.status === "COMPLETED") {
        const tentCardUrl = response.exportBlobs[0].url;
        (global as any).tentCardResult = await upload({
          type: "IMAGE",
          id: "TentCard",
          mimeType: "image/png",
          url: tentCardUrl,
          thumbnailUrl: tentCardUrl,
        });
      } else {
        console.log("The user exited the export flow.");
        console.log(response);
        return; // => { status: "ABORTED" }
      }
    })();    

    // const response: Response from make api for WA link
    const response = await fetch('https://hook.eu1.make.com/bxgng44x2ct2i65utgw2k1amr815wiee', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    // const result: parsing the response
    const sheetdata = (await response.json());
    var rowcount = parseInt(sheetdata.length);
    
    // iterating the data 
    for(var i = 1; i<rowcount ; i++){

      //WA link data
      var data = sheetdata[i]['value'];

      //Build url for calling QR Code
      const baseUrl = "https://api.qrserver.com/v1/create-qr-code/";
      const queryParams = {
        data: `${data}`,
        size: "100x100",
        format: "png"
      };
      const finalUrl = buildUrl(baseUrl, queryParams);
      console.log(finalUrl)

      // Timer
      await new Promise(resolve => setTimeout(resolve, 4000));

      //generating image ID
      var img_id = "OCR" + `${i}`
      let imgId = img_id as string

      // Upload the image
      const result = await upload({
        type: "IMAGE",
        id: imgId,
        mimeType: "image/png",
        url: finalUrl,
        thumbnailUrl: finalUrl,
      });

      await addPage();

      await addNativeElement({
        type: "IMAGE",
        ref: (global as any).tentCardResult.ref,
        width: 219.21259842519686,
        height: 472.4409448818898,
        top: 0,
        left: 0,
      });

      await addNativeElement({
        type: "IMAGE",
        ref: result.ref,
        width: width, 
        height: height, 
        top: top, 
        left: left, 
      });

    }
  }

  return (
    <div className={styles.scrollContainer}>
      <Rows spacing="1u">
        <Text
          size="medium">
          Input QR Code position
        </Text>
          <Rows spacing="1u">
            <Columns spacing="1u">
              <Column>
                <label><Text size="small">Width</Text></label>
                <TextInput id="widthVal"/>
                <label><Text size="small">X</Text></label>
                <TextInput id="leftVal"/>
              </Column>
              <Column>
                <label><Text size="small">Height</Text></label>
                <TextInput id="heightVal"/>
                <label><Text size="small">Y</Text></label>
                <TextInput id="topVal"/>
              </Column>
            </Columns>            
          <Button variant="primary" onClick={handleClick} stretch >
            Load Design
          </Button>  
        </Rows>  
      </Rows>
    </div>
  );
}


