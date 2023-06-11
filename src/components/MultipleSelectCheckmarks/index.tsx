import * as React from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'
import { useEffect, useState } from 'react'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

interface MultipleSelectCheckmarksProps {
  checkNames: string[]
  handleChecked: (value: string[] | []) => void
}
export function MultipleSelectCheckmarks({
  checkNames,
  handleChecked,
}: MultipleSelectCheckmarksProps) {
  const [checked, setChecked] = useState<string[]>([])
  const [checkList, setCheckList] = useState<string[]>([])

  const handleChange = (event: SelectChangeEvent<typeof checkList>) => {
    const {
      target: { value },
    } = event
    setChecked(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
    handleChecked(value as string[])
  }

  useEffect(() => {
    setCheckList(checkNames)
  }, [])

  return (
    <>
      <FormControl sx={{ m: 1, width: 120 }}>
        <InputLabel id="multiple-checkbox-label">Filtro</InputLabel>
        <Select
          labelId="multiple-checkbox-label"
          id="multiple-checkbox"
          multiple
          value={checked}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" size="small" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {checkList.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={checked.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  )
}
