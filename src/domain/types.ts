export type WorkflowStatus = 'RUNNING' | 'WAITING' | 'COMPLETED' | 'FAILED'
export type ReservationType = 'HARD' | 'SOFT' | 'NONE'
export type ReservationStatus = 'ACTIVE' | 'EXPIRING' | 'RELEASED'
export type ResourceType = 'Model tokens' | 'API quota' | 'Concurrency' | 'Database'
export type PolicyMode = 'Light' | 'Medium' | 'Aggressive'
export type EventType = 'success' | 'info' | 'warning' | 'danger'

export interface Workflow {
  id: string; name: string; agentType: string; status: WorkflowStatus; progress: number; workAtRisk: number
  currentStep: string; predictionConfidence: number; reservationType: ReservationType; resourceNeed: string; updatedAt: string
}
export interface Resource {
  id: string; name: string; type: ResourceType; capacity: string; used: number; reserved: number; available: number; unit: string; trend: number
}
export interface Reservation {
  id: string; workflowId: string; workflowName: string; resource: string; amount: string; type: ReservationType
  confidence: number; expiresIn: string; protectionValue: number; status: ReservationStatus
}
export interface PredictionNode { label: string; detail: string; confidence: number; state: 'complete' | 'reserved' | 'predicted' }
export interface Prediction { workflowId: string; workflowName: string; nodes: PredictionNode[]; pathConfidence: number; remainingTokens: string }
export interface Metric { label: string; value: string; change: string; direction: 'up' | 'down' | 'neutral'; tone: 'blue' | 'rose' | 'amber' | 'green' | 'violet'; helper: string }
export interface ActivityEvent { id: string; type: EventType; title: string; detail: string; timestamp: string }
export interface Policy { mode: PolicyMode; reservationCeiling: number; agingRate: number; confidenceThreshold: number }
export interface ExperimentPoint { label: string; baseline: number; sunkguard: number }
export interface Experiment { name: string; status: string; points: ExperimentPoint[] }