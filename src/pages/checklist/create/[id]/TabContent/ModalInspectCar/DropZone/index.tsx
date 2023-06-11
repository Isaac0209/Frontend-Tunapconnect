import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import PhotoSizeSelectActualOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined'

import { LinearProgress, Stack } from '@mui/material'
// import axios from 'axios'
import { ApiCore } from '@/lib/api'
import Image from 'next/image'
// import { GetServerSideProps } from 'next/types'
// import path from 'path'
// import fs from 'fs/promises'

import { ContainerImages } from './style'

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '8px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#707070',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  fontSize: 10,
  outline: 'none',
  transition: 'border .24s ease-in-out',
}

const focusedStyle = {
  borderColor: '#2196f3',
}

const acceptStyle = {
  borderColor: '#00e676',
}

const rejectStyle = {
  borderColor: '#ff1744',
}

interface imageData {
  id: number
  name: string
  url: string
  size: string
}
type positionsTypes =
  | 'frente'
  | 'lateralEsquerdo'
  | 'lateralDireito'
  | 'traseira'
  | 'teto'

// const positionsCar: Array<positionsTypes> = [
//   'frente',
//   'lateralEsquerdo',
//   'lateralDireito',
//   'traseira',
//   'teto',
// ]

interface imagemList {
  frente: imageData[]
  lateralEsquerdo: imageData[]
  lateralDireito: imageData[]
  traseira: imageData[]
  teto: imageData[]
}

interface MyDropzoneProps {
  listImagesUpload: imagemList
  handleAddImageUrlList: (value: imageData[], position: positionsTypes) => void
  positionsCar: positionsTypes
}

// async function savePathTemp(filesList = []) {
//   try {
//     if (!(filesList.length > 0)) return
//     const formData = new FormData()
//     formData.append('image', filesList[0])
//     const { data } = await axios.post('/api/uploadimage', formData)
//   } catch (error: any) {
//   }
// }

export function InspectionDropzone({
  handleAddImageUrlList,
  listImagesUpload,
  positionsCar,
}: MyDropzoneProps) {
  const api = new ApiCore()
  const [list, setList] = useState<imageData[] | []>([])
  const [listProgress, setListProgress] = useState<
    Array<'loading' | 'complete'> | []
  >([])

  async function updLoadImage(file: File) {
    const formData = new FormData()
    formData.append('file', file)

    return api
      .create('/uploads', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((response) => {
        return {
          id: response.data.data.id,
          name: response.data.data.original_name,
          url: response.data.data.url,
          size: response.data.data.size,
        }
      })
  }

  const onDrop = useCallback(
    async (acceptedFiles: any) => {
      const filesLoading = acceptedFiles.map((file: File) => {
        return 'loading'
      })

      setListProgress(filesLoading)
      const filesUploaded = []
      for (const file of acceptedFiles) {
        const result = await updLoadImage(file)

        filesUploaded.push(result)
        const newProgress = [...listProgress]
        const isProgress = newProgress.shift()
        setList((prevState) => [...prevState, result])
        if (isProgress === undefined) {
          setListProgress([])
        } else {
          setListProgress(newProgress)
        }
      }
      handleAddImageUrlList(filesUploaded, positionsCar)
    },
    [positionsCar],
  )

  // async function postUploadFile(data: any) {
  //   const session = await getSession()
  //   const token = session?.user.token
  //   console.log(token)
  //   try {
  //     const response = await axios({
  //       method: 'post',
  //       url: '/file-upload/image',
  //       data,
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //         Authorization: 'Bearer ' + token,
  //       },
  //     })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  useEffect(() => {
    setList(listImagesUpload[positionsCar])
  }, [positionsCar])

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      // maxFiles: 1,
      accept: {
        'image/png': ['.png'],
        'image/jpg': ['.jpg'],
      },
    })

  const style: any = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject],
  )

  return (
    <>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <PhotoSizeSelectActualOutlinedIcon />
        <p>Arraste e solte aqui ou click</p>
      </div>
      <ContainerImages
        sx={{ marginTop: 0.5 }}
        alignItems="flex-start"
        direction="row"
        justifyContent="flex-start"
        gap="3px"
        flexWrap="wrap"
        // height={40}
      >
        {list.length > 0 &&
          list.map((item, index) => {
            return (
              <a
                href={`${process.env.NEXT_PUBLIC_APP_API_IMAGE_URL}${item?.url}`}
                target="_blank"
                key={item?.id}
              >
                <Image
                  style={{
                    maxWidth: '23px',
                    maxHeight: '22px',
                  }}
                  src={`${process.env.NEXT_PUBLIC_APP_API_IMAGE_URL}${item?.url}`}
                  height={22}
                  width={23}
                  // key={item?.id}
                  alt=""
                />
              </a>
            )
          })}
        {listProgress.map((item, index) => (
          <Stack
            sx={{
              width: 23,
              alignItems: 'center',
              justifyContent: 'center',
              // marginTop: '-2px',
              padding: 0,
            }}
            component="div"
            key={index + Math.random() * 2000}
          >
            <PhotoSizeSelectActualOutlinedIcon
              sx={{
                marginTop: '-2px',
              }}
            />
            <LinearProgress
              sx={{
                width: 21,
                height: 2,
                marginTop: '-2px',
                padding: 0,
              }}
              color="inherit"
            />
          </Stack>
        ))}
      </ContainerImages>
    </>
  )
}
