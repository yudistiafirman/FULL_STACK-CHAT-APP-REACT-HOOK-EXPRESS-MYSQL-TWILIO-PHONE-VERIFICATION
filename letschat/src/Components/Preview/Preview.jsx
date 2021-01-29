import React from 'react'
import Cropper from 'react-easy-crop'


function Preview({preview,crop,zoom,setCrop,onCropComplete,setZoom}) {

    const mediaStyle={width:590,height:500}
    const cropAreaStyle= {width:550,height:950}
    const container={color:'red',position:'absolute',top:90,left:50,bottom:20,right:0,width:500,height:300}
    const cropSize={width:290,height:290}

   
    return (
        <Cropper
        image={preview}
        crop={crop}
        zoom={zoom}
        aspect={4 / 4}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
        style={{mediaStyle:mediaStyle,cropAreaStyle:cropAreaStyle,containerStyle:container}}
        cropShape="round"
        cropSize={cropSize}
        showGrid={false}
        minZoom={1}
        maxZoom={5}

                      
      />
    )
}

export default Preview
