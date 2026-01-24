export function calculatePerShiftPcb(lastPcb: number, firstPcb: number, segmentsCount: number) {
  return lastPcb - firstPcb + segmentsCount
}

export function calculatePerShiftMPcb(lastMPcb: number, firstMPcb: number) {
  return lastMPcb - firstMPcb + 1
}
