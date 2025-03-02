"use client";

import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Download, LayoutGrid, Link, Mail } from 'lucide-react';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';
import { QRCodeSVG } from 'qrcode.react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toPng } from 'html-to-image';

import {saveAs} from "file-saver";

function Qrcode() {
  const [url, setUrl] = React.useState("");
  const [color, setColor] =React.useState(" #fffff");
  const [bgColor, setBgColor] = React.useState(" #0357FFF");
  const [logo, setLogo] = React.useState<string | null>(null);
  const [logoFile, setLogoFile] = React.useState<File | null>(null);
  const [qrType, setQrType] = React.useState("link")
  const [email, setEmail] =   React.useState("");
  const [subject , setSubject] =React.useState("");
  const [message, setMessage] =React.useState("");

  const handleDownload = (type: "png" | "svg" | "jpg") => {
    const qrCodeElem = document.getElementById("qr-code");

    if(qrCodeElem) {
      if(type === "png") {
        toPng(qrCodeElem).then((dataUrl) => {
          saveAs(dataUrl, "qr-code.png");
        }).catch((err)=> {
          console.log("Error is generating QR CODE", err);
        });
      }else if(type=== "svg") {
        const svgElem = qrCodeElem.querySelector("svg");

        if(svgElem){
          const saveData =  new Blob([svgElem.outerHTML], {
            type: "image/svg+xml;charset=utf-8",
          });
          saveAs(saveData, "qr-code.svg");
        }
      }else if (type === "jpg") {
  toPng(qrCodeElem).then((dataUrl) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        saveAs(blob, "qr-code.jpg");
      }, "image/jpeg");
    };
  }).catch((err) => {
    console.log("Error in generating QR CODE", err);
  });
}

    }   
  };


  const handleEmailInput = () => {
    const mailToLink = `mailto:${email}?subject=${subject}&body=${encodeURIComponent(message)}`;
    setUrl(mailToLink);
  };

  return (
    <div className='relative z-10 mx-6 flex h-[700px] w-[1000px]'>
       <Card className='flex-1 flex flex-col w-full h-auto mx-auto bg-[#ecf7ff]/80 backdrop-blur-md shadow-sm border-2 border-white/40'>
       <CardHeader>
        <CardTitle className='text-3xl font-bold text-center text-[#379ea6]'>QR-Generator</CardTitle>
       </CardHeader>
       <CardContent className='flex-1'>
        <div className='h-full flex flex-col md:flex-row gap-8'>
        <div className='flex-1 space-y-6'>
          <Tabs 
          defaultValue='link' 
          className='space-y-6'
          onValueChange={(val) => setQrType(val)}
          >
            <TabsList className='h-10 w-full grid grid-cols-2 bg-[#3ea6b8] text-lg'>
               <TabsTrigger value='link' className='text-white font-bold'>
                <Link className='w-4 mr-2'/>
                Link</TabsTrigger>
               <TabsTrigger value='email' className='text-white font-bold'>
                <Mail className='w-4 mr-2'/>
                Email</TabsTrigger>
            </TabsList>
            <TabsContent value='link'>
              <div className='space-y-6'></div>
              <div className='space-y-2'>
                <Label htmlFor='url' className='font-semibold text-[#36c0b2]'>URL</Label>
                <Input
                 id='url'
                 type='text'
                 value={url}
                 onChange={(e) => setUrl(e.target.value)}
                 className='w-full border-2 border-white/70 rounded-md outline-none focus-visible:ring-0 placeholder:text-gray-400'
                 />
              </div>

            </TabsContent>
            <TabsContent value='email'>
              <div className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='email' className='font-semibold text-[#39b7b9]'>Email</Label>
                  <Input 
                  id='email'
                  type='email'
                  value={email}
                  placeholder='Enter email'
                  onChange={(e) => setEmail(e.target.value)}
                   className='w-full border-2 border-white/70 rounded-md outline-none focus-visible:ring-0 placeholder:text-gray-400'
                  />
                </div>
                <div className='space-y-2'>
                  <Label 
                  htmlFor='subject'
                  className='font-semibold text-[#36bdb2]'
                  >Subject</Label>
                  <Input 
                  id='subject' 
                  type='text'
                  value={subject}
                  placeholder='Enter subject'
                  onChange={(e) => setSubject(e.target.value)}
                  className='w-full border-2 border-white/70 rounded-md outline-none focus-visible:ring-0 placeholder:text-gray-400'
                  />
                </div>
                <div className="space-y-2">
                <Label 
                  htmlFor='message'
                  className='font-semibold text-[#37c6bc]'
                  >Message      
                 </Label>
                  <Textarea
                  id='message' 
                  
                  value={message}
                  placeholder='Enter message'
                  onChange={(e) => setMessage(e.target.value)}
                  className='w-full border-2 border-white/70 rounded-md outline-none focus-visible:ring-0 placeholder:text-gray-400 h-24 resize-none'
                  />
                </div>
                <Button className='py-7 px-8 bg-[#dfaaaa] rounded-full uppercase'
                onChange={handleEmailInput}
                >Generate Email QR Code</Button>
              </div>
            </TabsContent>
          </Tabs>
          <div className='space-y-4'>
            <div className='flex space-x-4'>
              <div className='space-y-2 flex-1' > 
                <Label 
                htmlFor='color'
                className='font-semibold text-[#2ea6bc]'
                >
                  QR CODE Color
                </Label>
                <div className='flex items-center gap-1'>
                  <div className='relative w-12 flex-1 h-12 rounded-md border-2 border-white/70'
                  style={{backgroundColor: color}}
                  >
                    <Input 
                    type='color'
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                    
                    />
                  </div>
                  <Input 
                  type='text'
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className='flex-1 border-2 h-12 bg-transparent border-white/70 focus:border-[#057FFF]/70 rounded-md outline-none focus:visible'
                  />
                </div>
              </div>
              <div className='space-y-2 flex-1' > 
                <Label 
                htmlFor='color'
                className='font-semibold text-[#2fbbbd]'
                >
                  Background Color
                </Label>
                <div className='flex items-center gap-1'>
                  <div className='relative w-12 flex-1 h-12 rounded-md border-2 border-white/70'
                  style={{backgroundColor: bgColor}}
                  >
                    <Input 
                    type='color'
                    value={color}
                    onChange={(e) => setBgColor(e.target.value)}
                    className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                    
                    />
                  </div>
                  <Input 
                  type='text'
                  value={color}
                  onChange={(e) => setBgColor(e.target.value)}
                  className='flex-1 border-2 h-12 bg-transparent border-white/70 focus:border-[#057FFF]/70 rounded-md outline-none focus:visible'
                  />
                </div>
              </div>

            </div>
            <div className='space-y-2'>
              <Label htmlFor='logo' className='font-bold text-[#33aeb2]'>Logo</Label>
              <Input 
              type='file'
              id='logo'
              accept='images/*'
              onChange={(e: any)=> {
                if(e.target.files && e.target.files[0]) {
                  setLogoFile(e.target.files[0]);

                  const reader = new FileReader();
                  reader.onload = () => {
                    setLogo(reader.result as string);
                     
                  };
                  reader.readAsDataURL(e.target.files[0]);
                }

                 
              }}
              className='w-full border-2 bg-transparent border-white/70 focus:border-[#057FFF]'
              
              />
            </div>
          </div>

        </div>
        <div className='relative flex-1 bg-[#1fc8bc] rounded-lg flex flex-col justify-center space-y-6'>

          <span>
            <LayoutGrid className='w-8 h-8 text-white absolute top-4 right-4'/>
          </span>
          <div id='qr-code' className='flex justify-center p-8'>
            <div className='relative'>
              <QRCodeSVG 
              value={url}
              size={256}
              fgColor={color}
              bgColor={bgColor}
              imageSettings={logo ? {src : logo, height: 50, width: 50, excavate: true} : undefined}
              
              />

{logo && (
                    <img
                      src={logo}
                      alt="logo"
                      className="absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-md border-none"
                    />
                  )}
            </div>
          </div>
          <div className='flex justify-center space-x-4'>
            <Button variant="outline" 
            onClick={()=> handleDownload("png")}
            >
              <Download className='w-3 h-4 mr-1 '/>
              Download PNG
            </Button>
            <Button variant="outline" 
            onClick={()=> handleDownload("svg")}
            >
              <Download className='w-3 h-4 mr-1'/>
              Download SVG
            </Button>
            <Button variant="outline" 
            onClick={()=> handleDownload("jpg")}
            >
              <Download className='w-3 h-4 mr-1'/>
              Download JPG
            </Button>
          </div>
        </div>
        </div>
       </CardContent>
       </Card>
    </div>
  )
}

export default Qrcode;
