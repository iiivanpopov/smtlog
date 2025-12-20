ALTER TABLE `smt_lines` ADD `first_m_pcb` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `smt_lines` ADD `first_pcb` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `smt_lines` ADD `last_m_pcb` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `smt_lines` ADD `last_pcb` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `smt_lines` ADD `pcb_side` text DEFAULT 'T' NOT NULL;--> statement-breakpoint
ALTER TABLE `smt_lines` ADD `done_per_shift_m_pcb` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `smt_lines` ADD `done_per_shift_pcb` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `smt_lines` ADD `segments_count` integer DEFAULT 0 NOT NULL;