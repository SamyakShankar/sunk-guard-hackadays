import type { ActivityEvent, Experiment, Metric, Policy, Prediction, Reservation, Resource, Workflow } from '../domain/types'

export const metrics: Metric[] = [
  { label: 'Active workflows', value: '12', change: '+3 today', direction: 'up', tone: 'blue', helper: '8 running · 4 waiting' },
  { label: 'Wasted tokens', value: '8.4%', change: '−31% vs baseline', direction: 'down', tone: 'rose', helper: 'Demo workload · 24h window' },
  { label: 'Late-stage failures', value: '3.2%', change: '−4.8 pts', direction: 'down', tone: 'amber', helper: 'Progress-weighted policy' },
  { label: 'Resource utilization', value: '76.8%', change: '+6.4%', direction: 'up', tone: 'green', helper: 'Across 4 shared resources' },
  { label: 'Jain fairness index', value: '0.91', change: '+0.07', direction: 'up', tone: 'violet', helper: 'Aging is active' },
  { label: 'Work-at-risk', value: '$184.20', change: '$42 protected', direction: 'neutral', tone: 'blue', helper: 'Current queued exposure' },
]

export const workflows: Workflow[] = [
  { id: 'wf-092', name: 'Customer insight brief', agentType: 'Research agent', status: 'RUNNING', progress: 82, workAtRisk: 42.8, currentStep: 'Review synthesis', predictionConfidence: 0.92, reservationType: 'HARD', resourceNeed: '16k Gemini tokens', updatedAt: 'now' },
  { id: 'wf-104', name: 'Repository migration plan', agentType: 'Code agent', status: 'WAITING', progress: 14, workAtRisk: 4.2, currentStep: 'Waiting for Gemini', predictionConfidence: 0.68, reservationType: 'SOFT', resourceNeed: '24k Gemini tokens', updatedAt: '18s ago' },
  { id: 'wf-087', name: 'Support escalation digest', agentType: 'Support agent', status: 'RUNNING', progress: 61, workAtRisk: 18.6, currentStep: 'Search recent tickets', predictionConfidence: 0.84, reservationType: 'HARD', resourceNeed: 'Search API · 2 calls', updatedAt: '42s ago' },
  { id: 'wf-099', name: 'Pricing anomaly check', agentType: 'Monitoring agent', status: 'WAITING', progress: 33, workAtRisk: 8.8, currentStep: 'Queued for database', predictionConfidence: 0.47, reservationType: 'NONE', resourceNeed: 'Database · 1 connection', updatedAt: '1m ago' },
]

export const resources: Resource[] = [
  { id: 'gemini', name: 'Gemini / Model tokens', type: 'Model tokens', capacity: '100k / min', used: 54, reserved: 23, available: 23, unit: 'k tokens', trend: 8 },
  { id: 'search', name: 'Search API', type: 'API quota', capacity: '120 req / min', used: 62, reserved: 14, available: 24, unit: 'requests', trend: -3 },
  { id: 'database', name: 'Workflow database', type: 'Database', capacity: '20 connections', used: 45, reserved: 20, available: 35, unit: 'connections', trend: 5 },
  { id: 'tools', name: 'Tool concurrency', type: 'Concurrency', capacity: '16 slots', used: 38, reserved: 25, available: 37, unit: 'slots', trend: -6 },
]

export const reservations: Reservation[] = [
  { id: 'res-441', workflowId: 'wf-092', workflowName: 'Customer insight brief', resource: 'Gemini tokens', amount: '16k tokens', type: 'HARD', confidence: 0.92, expiresIn: '02:18', protectionValue: 4.84, status: 'ACTIVE' },
  { id: 'res-438', workflowId: 'wf-087', workflowName: 'Support escalation digest', resource: 'Search API', amount: '2 requests', type: 'HARD', confidence: 0.84, expiresIn: '04:52', protectionValue: 2.16, status: 'ACTIVE' },
  { id: 'res-437', workflowId: 'wf-104', workflowName: 'Repository migration plan', resource: 'Gemini tokens', amount: '24k tokens', type: 'SOFT', confidence: 0.68, expiresIn: '00:42', protectionValue: 0.86, status: 'EXPIRING' },
]

export const prediction: Prediction = {
  workflowId: 'wf-092', workflowName: 'Customer insight brief',
  nodes: [
    { label: 'Search', detail: 'completed', confidence: 1, state: 'complete' }, { label: 'Gemini', detail: '8k tokens', confidence: 0.94, state: 'reserved' },
    { label: 'Review', detail: 'predicted next', confidence: 0.89, state: 'predicted' }, { label: 'Gemini', detail: '4k tokens', confidence: 0.86, state: 'predicted' },
  ], pathConfidence: 0.86, remainingTokens: '12k tokens',
}

export const events: ActivityEvent[] = [
  { id: 'evt-1', type: 'success', title: 'Workflow A protected', detail: 'Hard reservation committed · 16k Gemini tokens', timestamp: '12 sec ago' },
  { id: 'evt-2', type: 'info', title: 'Prediction updated', detail: 'wf-092 · path confidence increased to 0.92', timestamp: '28 sec ago' },
  { id: 'evt-3', type: 'warning', title: 'Workflow queued', detail: 'wf-104 · waiting for model token capacity', timestamp: '44 sec ago' },
  { id: 'evt-4', type: 'danger', title: 'Prediction mismatch', detail: 'wf-087 · released stale tool reservation', timestamp: '1 min ago' },
  { id: 'evt-5', type: 'success', title: 'Re-planning complete', detail: 'wf-087 · Search API reservation renewed', timestamp: '1 min ago' },
]
export const policy: Policy = { mode: 'Medium', reservationCeiling: 70, agingRate: 0.16, confidenceThreshold: 0.8 }
export const experiment: Experiment = { name: 'Progress weighting thesis', status: 'Seed 1042 · simulated', points: [{ label: 'Wasted tokens', baseline: 23.4, sunkguard: 8.4 }, { label: 'Late failures', baseline: 8.0, sunkguard: 3.2 }] }