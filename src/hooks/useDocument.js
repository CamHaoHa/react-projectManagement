//style 

//react
import {useEffect, useState} from 'react'
//component
import {projectFireStore} from '../firebase/config'


export const useDocument = (collection, id) =>{
    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)

    //real time document data
    useEffect(() => {
        const ref = projectFireStore.collection(collection).doc(id)
        
        const unsubscribe = ref.onSnapshot(snapshot => {
            //need to make sure the doc exixits and and has data
            if(snapshot.data()) {
                setDocument({...snapshot.data(), id:snapshot.id})
                setError(null)
            
            }
            else {
                setError('no such document exitsts')
            }
        }, err => {
            console.log(err.message)
            setError('failed to get document')
        })

        //unsub to unmount

        return () => unsubscribe()
    }, [collection, id])
  return {document, error}
}
