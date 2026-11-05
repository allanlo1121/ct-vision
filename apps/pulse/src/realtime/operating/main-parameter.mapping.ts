// tbm-operating/runtime-parameter.mapping.ts

// export type MainParameter = {
//   ringNo: number | null
//   chainage: number | null
//   excavationMode: boolean | null
//   segmentErectionMode: boolean | null
//   thrustSpeed: number | null
//   penetrationRate: number | null
//   thrustPressure: number | null
//   thrustCylinderStroke: number | null
//   cutterSpeed: number | null
//   cutterTorque: number | null
//   totalThrust: number | null
// }

export const mainParameterMapping = {
  ring_no: "s100100008",
  chainage: "s100100005",
  excavation_mode: "b000000001",
  segment_erection_mode: "b000000002",
  thrust_speed: "s010102004",
  penetration_rate: "s010103006",
  thrust_pressure: "s010109001",
  thrust_cylinder_stroke: "s050006005",
  cutter_speed: "s050001001",
  cutter_torque: "s050109001",
  total_thrust: "s050009003",
} as const

export type MainParameter = Record<
  keyof typeof mainParameterMapping,
  number | null
>