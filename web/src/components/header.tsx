import { CirclePlus } from "lucide-react";
import Image from 'next/image'
import LogoImage from '../assets/logo.svg'

export function Header() {
  return (
    <header style={{
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
    }}>
       <Image
      src={LogoImage}
      width={40}
      height={40}
      alt="Picture of the author"
    />
      <button style={{
        color: "#000000",
        backgroundColor: "#10B981",
        border: "none",
        borderRadius: "8px",
        
      }}>
        <CirclePlus />
      </button>
    </header>
  )
}
