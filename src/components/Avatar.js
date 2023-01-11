//style
import './Avatar.css'
//react

//component
export default function Avatar({src}) {
  return (
    <div className='avatar'>
        <img src={src} alt='user avatar' />
    </div>
  )
}
