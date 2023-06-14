import { SvgIcon, SvgIconProps } from '@mui/material'

// ----------------------------------------------------------------------

// CloseIcon
export function CloseIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 C17.5228475,22 22,17.5228475 22,12 C22,9.3478351 20.9464316,6.80429597 19.0710678,4.92893219 C17.195704,3.0535684 14.6521649,2 12,2 Z M14.71,13.29 C14.8993127,13.4777666 15.0057983,13.7333625 15.0057983,14 C15.0057983,14.2666375 14.8993127,14.5222334 14.71,14.71 C14.5222334,14.8993127 14.2666375,15.0057983 14,15.0057983 C13.7333625,15.0057983 13.4777666,14.8993127 13.29,14.71 L12,13.41 L10.71,14.71 C10.5222334,14.8993127 10.2666375,15.0057983 10,15.0057983 C9.73336246,15.0057983 9.4777666,14.8993127 9.29,14.71 C9.10068735,14.5222334 8.99420168,14.2666375 8.99420168,14 C8.99420168,13.7333625 9.10068735,13.4777666 9.29,13.29 L10.59,12 L9.29,10.71 C8.89787783,10.3178778 8.89787783,9.68212217 9.29,9.29 C9.68212217,8.89787783 10.3178778,8.89787783 10.71,9.29 L12,10.59 L13.29,9.29 C13.6821222,8.89787783 14.3178778,8.89787783 14.71,9.29 C15.1021222,9.68212217 15.1021222,10.3178778 14.71,10.71 L13.41,12 L14.71,13.29 Z" />
    </SvgIcon>
  )
}

// StarIcon
export function StarIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M17.56,21 C17.4000767,21.0006435 17.2423316,20.9629218 17.1,20.89 L12,18.22 L6.9,20.89 C6.56213339,21.067663 6.15259539,21.0374771 5.8444287,20.8121966 C5.53626201,20.5869161 5.38323252,20.2058459 5.45,19.83 L6.45,14.2 L2.33,10.2 C2.06805623,9.93860108 1.9718844,9.55391377 2.08,9.2 C2.19824414,8.83742187 2.51242293,8.57366684 2.89,8.52 L8.59,7.69 L11.1,2.56 C11.2670864,2.21500967 11.6166774,1.99588989 12,1.99588989 C12.3833226,1.99588989 12.7329136,2.21500967 12.9,2.56 L15.44,7.68 L21.14,8.51 C21.5175771,8.56366684 21.8317559,8.82742187 21.95,9.19 C22.0581156,9.54391377 21.9619438,9.92860108 21.7,10.19 L17.58,14.19 L18.58,19.82 C18.652893,20.2027971 18.4967826,20.5930731 18.18,20.82 C17.9989179,20.9468967 17.7808835,21.010197 17.56,21 L17.56,21 Z" />
    </SvgIcon>
  )
}

// Using for Alert
export function InfoIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 C17.5228475,22 22,17.5228475 22,12 C22,9.3478351 20.9464316,6.80429597 19.0710678,4.92893219 C17.195704,3.0535684 14.6521649,2 12,2 Z M13,16 C13,16.5522847 12.5522847,17 12,17 C11.4477153,17 11,16.5522847 11,16 L11,11 C11,10.4477153 11.4477153,10 12,10 C12.5522847,10 13,10.4477153 13,11 L13,16 Z M12,9 C11.4477153,9 11,8.55228475 11,8 C11,7.44771525 11.4477153,7 12,7 C12.5522847,7 13,7.44771525 13,8 C13,8.55228475 12.5522847,9 12,9 Z" />
    </SvgIcon>
  )
}

export function WarningIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M22.56,16.3 L14.89,3.58 C14.2597186,2.59400001 13.1702353,1.99737652 12,1.99737652 C10.8297647,1.99737652 9.74028139,2.59400001 9.11,3.58 L1.44,16.3 C0.888546003,17.2192471 0.869485343,18.3628867 1.39,19.3 C1.99197363,20.3551378 3.11522982,21.0046397 4.33,21 L19.67,21 C20.8765042,21.0128744 21.9978314,20.3797441 22.61,19.34 C23.146086,18.3926382 23.1269508,17.2292197 22.56,16.3 L22.56,16.3 Z M12,17 C11.4477153,17 11,16.5522847 11,16 C11,15.4477153 11.4477153,15 12,15 C12.5522847,15 13,15.4477153 13,16 C13,16.5522847 12.5522847,17 12,17 Z M13,13 C13,13.5522847 12.5522847,14 12,14 C11.4477153,14 11,13.5522847 11,13 L11,9 C11,8.44771525 11.4477153,8 12,8 C12.5522847,8 13,8.44771525 13,9 L13,13 Z" />
    </SvgIcon>
  )
}

export function SuccessIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 C17.5228475,22 22,17.5228475 22,12 C22,9.3478351 20.9464316,6.80429597 19.0710678,4.92893219 C17.195704,3.0535684 14.6521649,2 12,2 Z M16.3,9.61 L11.73,15.61 C11.5412074,15.855247 11.2494966,15.9992561 10.94,16.0000145 C10.6322197,16.001658 10.3408221,15.861492 10.15,15.62 L7.71,12.51 C7.49028166,12.2277602 7.43782669,11.8497415 7.57239438,11.5183399 C7.70696206,11.1869384 8.00810836,10.9525017 8.36239438,10.9033399 C8.7166804,10.8541782 9.07028166,10.9977602 9.29,11.28 L10.92,13.36 L14.7,8.36 C14.917932,8.07418751 15.2717886,7.92635122 15.6282755,7.97217964 C15.9847624,8.01800806 16.2897207,8.25053875 16.4282755,8.58217966 C16.5668304,8.91382056 16.517932,9.29418753 16.3,9.58 L16.3,9.61 Z" />
    </SvgIcon>
  )
}

export function ErrorIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 C17.5228475,22 22,17.5228475 22,12 C22,9.3478351 20.9464316,6.80429597 19.0710678,4.92893219 C17.195704,3.0535684 14.6521649,2 12,2 Z M12,17 C11.4477153,17 11,16.5522847 11,16 C11,15.4477153 11.4477153,15 12,15 C12.5522847,15 13,15.4477153 13,16 C13,16.5522847 12.5522847,17 12,17 Z M13,13 C13,13.5522847 12.5522847,14 12,14 C11.4477153,14 11,13.5522847 11,13 L11,8 C11,7.44771525 11.4477153,7 12,7 C12.5522847,7 13,7.44771525 13,8 L13,13 Z" />
    </SvgIcon>
  )
}

// Using for Checkbox
export function CheckboxIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M17 3a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4h10zm0 2H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2z" />
    </SvgIcon>
  )
}

export function CheckboxCheckedIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M17 3a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4h10zm-1.372 4.972a1.006 1.006 0 00-.928.388l-3.78 5-1.63-2.08a1.001 1.001 0 00-1.58 1.23l2.44 3.11a1 1 0 001.58-.01l4.57-6v-.03a1.006 1.006 0 00-.672-1.608z" />
    </SvgIcon>
  )
}

export function CheckboxIndeterminateIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M17 3a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4h10zm-1.75 8h-6.5a.75.75 0 00-.75.75v.5c0 .414.336.75.75.75h6.5a.75.75 0 00.75-.75v-.5a.75.75 0 00-.75-.75z" />
    </SvgIcon>
  )
}

// Using for Select Input
export function InputSelectIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...props}
      sx={{
        right: 12,
        fontSize: 16,
        position: 'absolute',
        pointerEvents: 'none',
      }}
    >
      <path d="M12,16 C11.7663478,16.0004565 11.5399121,15.9190812 11.36,15.77 L5.36,10.77 C4.93474074,10.4165378 4.87653776,9.78525926 5.23,9.36 C5.58346224,8.93474074 6.21474074,8.87653776 6.64,9.23 L12,13.71 L17.36,9.39 C17.5665934,9.2222295 17.8315409,9.14373108 18.0961825,9.17188444 C18.3608241,9.2000378 18.6033268,9.33252029 18.77,9.54 C18.9551341,9.74785947 19.0452548,10.0234772 19.0186853,10.3005589 C18.9921158,10.5776405 18.8512608,10.8311099 18.63,11 L12.63,15.83 C12.444916,15.955516 12.2231011,16.0153708 12,16 Z" />
    </SvgIcon>
  )
}

//  Using for TreeView
export function TreeViewCollapseIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M18,3 C19.6568542,3 21,4.34314575 21,6 L21,6 L21,18 C21,19.6568542 19.6568542,21 18,21 L18,21 L6,21 C4.34314575,21 3,19.6568542 3,18 L3,18 L3,6 C3,4.34314575 4.34314575,3 6,3 L6,3 Z M18,5 L6,5 C5.44771525,5 5,5.44771525 5,6 L5,6 L5,18 C5,18.5522847 5.44771525,19 6,19 L6,19 L18,19 C18.5522847,19 19,18.5522847 19,18 L19,18 L19,6 C19,5.44771525 18.5522847,5 18,5 L18,5 Z M12,8 C12.5522847,8 13,8.44771525 13,9 L13,9 L13,11 L15,11 C15.5522847,11 16,11.4477153 16,12 C16,12.5522847 15.5522847,13 15,13 L15,13 L13,13 L13,15 C13,15.5522847 12.5522847,16 12,16 C11.4477153,16 11,15.5522847 11,15 L11,15 L11,13 L9,13 C8.44771525,13 8,12.5522847 8,12 C8,11.4477153 8.44771525,11 9,11 L9,11 L11,11 L11,9 C11,8.44771525 11.4477153,8 12,8 Z" />
    </SvgIcon>
  )
}

export function TreeViewExpandIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M18,3 C19.6568542,3 21,4.34314575 21,6 L21,6 L21,18 C21,19.6568542 19.6568542,21 18,21 L18,21 L6,21 C4.34314575,21 3,19.6568542 3,18 L3,18 L3,6 C3,4.34314575 4.34314575,3 6,3 L6,3 Z M18,5 L6,5 C5.44771525,5 5,5.44771525 5,6 L5,6 L5,18 C5,18.5522847 5.44771525,19 6,19 L6,19 L18,19 C18.5522847,19 19,18.5522847 19,18 L19,18 L19,6 C19,5.44771525 18.5522847,5 18,5 L18,5 Z M15,11 C15.5522847,11 16,11.4477153 16,12 C16,12.5522847 15.5522847,13 15,13 L15,13 L9,13 C8.44771525,13 8,12.5522847 8,12 C8,11.4477153 8.44771525,11 9,11 L9,11 Z" />
    </SvgIcon>
  )
}

export function TreeViewEndIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M18,3 C19.6568542,3 21,4.34314575 21,6 L21,6 L21,18 C21,19.6568542 19.6568542,21 18,21 L18,21 L6,21 C4.34314575,21 3,19.6568542 3,18 L3,18 L3,6 C3,4.34314575 4.34314575,3 6,3 L6,3 Z M18,5 L6,5 C5.44771525,5 5,5.44771525 5,6 L5,6 L5,18 C5,18.5522847 5.44771525,19 6,19 L6,19 L18,19 C18.5522847,19 19,18.5522847 19,18 L19,18 L19,6 C19,5.44771525 18.5522847,5 18,5 L18,5 Z M14,8.99420168 C14.2666375,8.99420168 14.5222334,9.10068735 14.71,9.29 C14.8993127,9.4777666 15.0057983,9.73336246 15.0057983,10 C15.0057983,10.2666375 14.8993127,10.5222334 14.71,10.71 L14.71,10.71 L13.41,12 L14.71,13.29 C14.8993127,13.4777666 15.0057983,13.7333625 15.0057983,14 C15.0057983,14.2666375 14.8993127,14.5222334 14.71,14.71 C14.5222334,14.8993127 14.2666375,15.0057983 14,15.0057983 C13.7333625,15.0057983 13.4777666,14.8993127 13.29,14.71 L13.29,14.71 L12,13.41 L10.71,14.71 C10.5222334,14.8993127 10.2666375,15.0057983 10,15.0057983 C9.73336246,15.0057983 9.4777666,14.8993127 9.29,14.71 C9.10068735,14.5222334 8.99420168,14.2666375 8.99420168,14 C8.99420168,13.7333625 9.10068735,13.4777666 9.29,13.29 L9.29,13.29 L10.59,12 L9.29,10.71 C8.89787783,10.3178778 8.89787783,9.68212217 9.29,9.29 C9.68212217,8.89787783 10.3178778,8.89787783 10.71,9.29 L10.71,9.29 L12,10.59 L13.29,9.29 C13.4777666,9.10068735 13.7333625,8.99420168 14,8.99420168 Z" />
    </SvgIcon>
  )
}
