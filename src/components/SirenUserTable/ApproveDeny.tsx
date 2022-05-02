import * as React from 'react';
import { Stack, Button } from '@mui/material';

export default function ApproveDeny(props) {
  const sirenUserInput = props.user
  const handleStatusChange = props.handleStatusChange
  return (
    <Stack direction="row" spacing={2}>
      <Button variant="contained" color="success" onClick={() => handleStatusChange(sirenUserInput, "Approved")}>
        Approve
      </Button>
      <Button variant="outlined" color="error" onClick={() => handleStatusChange(sirenUserInput, "Denied")}>
        Deny
      </Button>
    </Stack>
  )
}