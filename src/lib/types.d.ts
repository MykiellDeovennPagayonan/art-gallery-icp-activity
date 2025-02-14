type ArtIs = string[]
type Artwork = {
  imageUrl: string,
  title: string,
  description: string,
  comments?: Comment[]
}

type Comment = {      
  imageUrl: string,  
  text: string,    
  timestamp: number, 
}