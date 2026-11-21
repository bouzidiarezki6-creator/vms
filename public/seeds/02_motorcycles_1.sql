BEGIN;
ALTER TABLE motorcycles DISABLE TRIGGER after_motorcycle_status_available;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('a40d157f-1954-4f9a-ab0e-4e7dead333db', '3b2af5ef-3d15-4188-a1a0-af7e7c841740', '894255e4-c95e-4fd0-ac78-d99da96abdf5', 'VMS2026DZ000001', 'Blanc Nacre', '150cc • Liquide • EFI Delphi', '2026-11-01', '2026-11-15', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-15T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('0dcf1332-94d0-4e90-a110-6fc1a0014495', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '888f1d4d-a5c8-45af-ac55-7bdd7a43a467', 'VMS2026DZ000002', 'Gris Titane', '110cc • Air • Carburateur', '2026-10-31', '2026-11-14', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-14T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('ed6cd971-4b5d-4fe0-a798-06f8dabfab5f', '1cb3c954-cce8-4a24-a4d7-13ccc2022428', '0112ec21-a591-42ad-af2d-b766685906a0', 'VMS2026DZ000003', 'Bleu Nuit', '125cc • Air • Carburateur', '2026-10-30', '2026-11-13', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-13T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('b9eef9fc-02db-4a09-a96c-8f7b423a150c', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '81154d42-2237-4ddd-a95f-e70dd0795b96', 'VMS2026DZ000004', 'Rouge VMS Racing', '175cc • Liquide • EFI Bosch', '2026-07-31', '2026-08-14', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-08-14T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('6bd90efe-075b-452a-adb5-a476e17eb14e', '6670c650-fefe-4b76-ac42-e3b7e60d10bf', 'c1e837c2-e597-445a-a434-3f431684505f', 'VMS2026DZ000005', 'Jaune Sport', '150cc • Air forcé • EFI', '2026-10-28', '2026-11-11', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-11T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('5e92b8c5-80ad-4cdf-ac92-03009d793bf9', 'efe00453-2df4-467f-a177-0484ee609660', '2604f326-16d0-4e0d-a642-369d57b5baf3', 'VMS2026DZ000006', 'Noir Mat', '125cc • Liquide • EFI', '2026-10-27', '2026-11-10', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-10T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('a597c671-c868-4e18-a78d-75dea26f3483', '8fa80271-7cbe-43f2-a6a1-49d0db410fa2', '690a1d9c-3454-48a9-a855-d96d4ebcfc63', 'VMS2026DZ000007', 'Blanc Nacre', '500cc • Liquide • EFI Double Papillon', '2026-10-26', '2026-11-09', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-09T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('b96feed4-af55-4873-ad5c-8d9b7d3119dd', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '88d541ce-eb77-491b-ac5a-a72f9e548772', 'VMS2026DZ000008', 'Gris Titane', '125cc • Air • Carburateur optimisé', '2026-07-27', '2026-08-10', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-08-10T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('e3c9c639-4d2d-484f-aaa3-a86bea53acf1', '3b2af5ef-3d15-4188-a1a0-af7e7c841740', 'f5e1d4eb-cbc1-49dc-a6c7-b696f13675bf', 'VMS2026DZ000009', 'Bleu Nuit', '150cc • Liquide • EFI Delphi', '2026-10-24', '2026-11-07', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-07T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('9515bebe-e5d0-4fee-a977-569b753a7d9b', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', 'c6ec9f5b-132d-41d9-a13d-3459935c3ade', 'VMS2026DZ000010', 'Rouge VMS Racing', '110cc • Air • Carburateur', '2026-10-23', '2026-11-06', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-06T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('a4ee0eb3-9dd5-48e0-ab6d-e7c9a3167ead', '1cb3c954-cce8-4a24-a4d7-13ccc2022428', '37f82d93-cafd-4f41-af5f-1508b0b3b8f9', 'VMS2026DZ000011', 'Jaune Sport', '125cc • Air • Carburateur', '2026-10-22', '2026-11-05', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-05T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('6d0d6401-fb3e-4db4-ab1e-e5312b3863fd', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', 'e9de928b-17a6-44e6-ae14-0942fb6fa85c', 'VMS2026DZ000012', 'Noir Mat', '175cc • Liquide • EFI Bosch', '2026-07-23', '2026-08-06', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-08-06T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('ef5146e3-4ce2-493e-a1c9-d2f90036922c', '6670c650-fefe-4b76-ac42-e3b7e60d10bf', '4074181c-2e0e-4a3f-aedc-871b250b89a5', 'VMS2026DZ000013', 'Blanc Nacre', '150cc • Air forcé • EFI', '2026-10-20', '2026-11-03', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-03T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('cd37fc9d-6110-4bf0-a148-985a6c5653fe', 'efe00453-2df4-467f-a177-0484ee609660', '20abf9d5-4a87-4a53-a1df-3589f9e9e9c6', 'VMS2026DZ000014', 'Gris Titane', '125cc • Liquide • EFI', '2026-10-19', '2026-11-02', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-02T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('bcece995-d378-4086-a267-275dad383167', '8fa80271-7cbe-43f2-a6a1-49d0db410fa2', '654a20b5-3c93-47e1-aa05-b9cb364e463f', 'VMS2026DZ000015', 'Bleu Nuit', '500cc • Liquide • EFI Double Papillon', '2026-10-18', '2026-11-01', 'reserved', 'Contrôle qualité VMS usine validé', NULL, '2026-11-01T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('627c7012-5b03-44c3-a5c7-8bea7b366d25', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', 'c4ad5610-eefc-4d85-ab1b-be67e397aeb6', 'VMS2026DZ000016', 'Rouge VMS Racing', '125cc • Air • Carburateur optimisé', '2026-07-19', '2026-08-02', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-08-02T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('146d897e-bea6-43ad-a1a8-498e7f9fc30d', '3b2af5ef-3d15-4188-a1a0-af7e7c841740', 'c70bbe23-02c5-486e-ab34-be528137d4df', 'VMS2026DZ000017', 'Jaune Sport', '150cc • Liquide • EFI Delphi', '2026-10-16', '2026-10-30', 'in_transfer', 'Contrôle qualité VMS usine validé', NULL, '2026-10-30T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('a1592610-a6e8-4583-ae8e-2dbbd991b331', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '21db1b6e-f688-4a53-ac97-e05973bbda8d', 'VMS2026DZ000018', 'Noir Mat', '110cc • Air • Carburateur', '2026-10-15', '2026-10-29', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-29T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('8e05d281-c4ee-4567-a226-398e2badb338', '1cb3c954-cce8-4a24-a4d7-13ccc2022428', '256f8a1b-b5e7-4991-a728-02b869440477', 'VMS2026DZ000019', 'Blanc Nacre', '125cc • Air • Carburateur', '2026-10-14', '2026-10-28', 'sold', 'Contrôle qualité VMS usine validé', '2026-11-18', '2026-10-28T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('60d21271-2aa0-44fa-ac4b-2aa73be4d5d4', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', 'bc78aed8-b4b8-4716-abf9-2cd78cdb1660', 'VMS2026DZ000020', 'Gris Titane', '175cc • Liquide • EFI Bosch', '2026-07-15', '2026-07-29', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-07-29T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('b98fd59c-749a-4482-acff-850b440c046f', '6670c650-fefe-4b76-ac42-e3b7e60d10bf', '00a4e5aa-aeee-403f-af1c-1f8b058c4e12', 'VMS2026DZ000021', 'Bleu Nuit', '150cc • Air forcé • EFI', '2026-10-12', '2026-10-26', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-26T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('c555706d-d7a6-4e54-a73b-7a09d41528ae', 'efe00453-2df4-467f-a177-0484ee609660', '3f6f6575-5045-47c0-a7e2-ade1882ce203', 'VMS2026DZ000022', 'Rouge VMS Racing', '125cc • Liquide • EFI', '2026-10-11', '2026-10-25', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-25T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('1806cc60-cc91-4bc1-aad9-66281eebc173', '8fa80271-7cbe-43f2-a6a1-49d0db410fa2', 'c80536ee-471f-4432-ab52-27ba8d3143fe', 'VMS2026DZ000023', 'Jaune Sport', '500cc • Liquide • EFI Double Papillon', '2026-10-10', '2026-10-24', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-24T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('887fbff7-97e0-4d02-aac9-97398d8b25aa', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '2f39d314-009b-4140-a754-d370518155e7', 'VMS2026DZ000024', 'Noir Mat', '125cc • Air • Carburateur optimisé', '2026-07-11', '2026-07-25', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-07-25T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('cc24edfb-bcae-45ef-a874-7066ce73e310', '3b2af5ef-3d15-4188-a1a0-af7e7c841740', 'f4e92145-68b7-4af7-a672-343e85e5f413', 'VMS2026DZ000025', 'Blanc Nacre', '150cc • Liquide • EFI Delphi', '2026-10-08', '2026-10-22', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-22T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('d5b396c2-fd11-4edc-a8d5-f72a474b9f2e', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', 'ddde321b-ba24-45cd-a181-6c726ffb3cab', 'VMS2026DZ000026', 'Gris Titane', '110cc • Air • Carburateur', '2026-10-07', '2026-10-21', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-21T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('46a82515-3bec-496b-a1f1-6fe8eec185f9', '1cb3c954-cce8-4a24-a4d7-13ccc2022428', '318aa009-a953-4107-a027-41fc3e3379b1', 'VMS2026DZ000027', 'Bleu Nuit', '125cc • Air • Carburateur', '2026-10-06', '2026-10-20', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-20T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('0365d4b5-2da5-4572-aa80-694637ff1bc1', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', 'c13d2978-83d8-49b3-a4fe-93e92b1fc07f', 'VMS2026DZ000028', 'Rouge VMS Racing', '175cc • Liquide • EFI Bosch', '2026-07-07', '2026-07-21', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-07-21T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('e45ad110-c3c7-4373-a9cc-ca794349b938', '6670c650-fefe-4b76-ac42-e3b7e60d10bf', '4d07418a-529d-4f69-a3bb-55da145e018a', 'VMS2026DZ000029', 'Jaune Sport', '150cc • Air forcé • EFI', '2026-10-04', '2026-10-18', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-18T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('6fc3bd90-c023-4e82-a570-655a6b61fd14', 'efe00453-2df4-467f-a177-0484ee609660', '5a00a329-92b0-48bb-a53b-2403b54a9696', 'VMS2026DZ000030', 'Noir Mat', '125cc • Liquide • EFI', '2026-10-03', '2026-10-17', 'reserved', 'Contrôle qualité VMS usine validé', NULL, '2026-10-17T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('3f37b1dd-76e2-450a-ac2f-51b034960750', '8fa80271-7cbe-43f2-a6a1-49d0db410fa2', 'd6c883f8-c7df-4b55-a711-25fcc9a5cb13', 'VMS2026DZ000031', 'Blanc Nacre', '500cc • Liquide • EFI Double Papillon', '2026-10-02', '2026-10-16', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-16T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('0c4eed66-3819-4c0e-a52d-05d5e8540f6f', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '24c1efb6-43f6-41f9-a1ae-8602a4ffb00b', 'VMS2026DZ000032', 'Gris Titane', '125cc • Air • Carburateur optimisé', '2026-07-03', '2026-07-17', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-07-17T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('ada5a552-7911-4fe2-a8d0-2e3219228505', '3b2af5ef-3d15-4188-a1a0-af7e7c841740', '437e31eb-4fec-4c07-a445-5844ff86bf98', 'VMS2026DZ000033', 'Bleu Nuit', '150cc • Liquide • EFI Delphi', '2026-09-30', '2026-10-14', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-14T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('8584b9ce-7bc1-49fc-a155-8c6edc9a80c6', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '7f3131b5-6b4c-4390-a01f-6e5ce2744647', 'VMS2026DZ000034', 'Rouge VMS Racing', '110cc • Air • Carburateur', '2026-09-29', '2026-10-13', 'in_transfer', 'Contrôle qualité VMS usine validé', NULL, '2026-10-13T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('1bd9d479-1566-4d7e-a306-014db2ccbe1d', '1cb3c954-cce8-4a24-a4d7-13ccc2022428', '6676117f-09a1-4fe6-ad91-c5be0787fe7a', 'VMS2026DZ000035', 'Jaune Sport', '125cc • Air • Carburateur', '2026-09-28', '2026-10-12', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-12T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('ea23f32f-30b5-4d91-a0c7-6b30f027ecde', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '960b7501-9ca5-49cd-a5d2-2aec63e297cf', 'VMS2026DZ000036', 'Noir Mat', '175cc • Liquide • EFI Bosch', '2026-06-29', '2026-07-13', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-07-13T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('73460632-14bf-467c-a955-93ab5e498d4b', '6670c650-fefe-4b76-ac42-e3b7e60d10bf', 'edbb8233-80cb-4410-ae3f-65f0e5455e71', 'VMS2026DZ000037', 'Blanc Nacre', '150cc • Air forcé • EFI', '2026-09-26', '2026-10-10', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-10T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('b49ab6a1-dd80-4770-affb-e36c6d184a95', 'efe00453-2df4-467f-a177-0484ee609660', '9b57ebb3-4567-46dd-a03f-7833f6959606', 'VMS2026DZ000038', 'Gris Titane', '125cc • Liquide • EFI', '2026-09-25', '2026-10-09', 'sold', 'Contrôle qualité VMS usine validé', '2026-11-18', '2026-10-09T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('c90c6e4c-291a-4b8a-a12e-21fdefb4eb46', '8fa80271-7cbe-43f2-a6a1-49d0db410fa2', 'ced756da-4380-41b2-adad-65d1de43d461', 'VMS2026DZ000039', 'Bleu Nuit', '500cc • Liquide • EFI Double Papillon', '2026-09-24', '2026-10-08', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-08T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('fe521b25-5d8e-49ec-a8f4-1282c1a2e04f', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '007d212c-d706-4db5-af1c-75bbf3eb35d9', 'VMS2026DZ000040', 'Rouge VMS Racing', '125cc • Air • Carburateur optimisé', '2026-06-25', '2026-07-09', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-07-09T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('39427f6d-8cae-497e-ad02-5275b4ef0927', '3b2af5ef-3d15-4188-a1a0-af7e7c841740', '04a0a795-3b9d-4fbb-a974-c98ef044a2ab', 'VMS2026DZ000041', 'Jaune Sport', '150cc • Liquide • EFI Delphi', '2026-09-22', '2026-10-06', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-06T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('b1848842-2da7-45d6-a640-f4681a93d415', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '472ef702-ed6d-4dea-aefe-8880c99dc9cd', 'VMS2026DZ000042', 'Noir Mat', '110cc • Air • Carburateur', '2026-09-21', '2026-10-05', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-05T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('0c4ece44-f1eb-47b7-a26a-138f14ed4346', '1cb3c954-cce8-4a24-a4d7-13ccc2022428', 'b0d23458-9fde-4915-aa61-865751368634', 'VMS2026DZ000043', 'Blanc Nacre', '125cc • Air • Carburateur', '2026-09-20', '2026-10-04', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-04T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('e363313a-2576-4663-ab49-3a67b0e999fa', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', 'd189e080-175c-4d64-ae46-cc884633d2f5', 'VMS2026DZ000044', 'Gris Titane', '175cc • Liquide • EFI Bosch', '2026-06-21', '2026-07-05', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-07-05T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('e71471db-f328-49db-ac04-f2bcb11b90dd', '6670c650-fefe-4b76-ac42-e3b7e60d10bf', 'fec556c3-9e83-4ab6-aeaf-2b446e6fed2c', 'VMS2026DZ000045', 'Bleu Nuit', '150cc • Air forcé • EFI', '2026-09-18', '2026-10-02', 'reserved', 'Contrôle qualité VMS usine validé', NULL, '2026-10-02T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('043f04ac-e67b-421d-a883-079cf96f3412', 'efe00453-2df4-467f-a177-0484ee609660', '0cd6bd05-9568-49ac-a0bb-a9de9206e548', 'VMS2026DZ000046', 'Rouge VMS Racing', '125cc • Liquide • EFI', '2026-09-17', '2026-10-01', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-01T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('1b8b0534-a736-403f-aea6-4d81a6520df5', '8fa80271-7cbe-43f2-a6a1-49d0db410fa2', 'dafa8f2d-2471-4a5d-a0c6-24cd172fa668', 'VMS2026DZ000047', 'Jaune Sport', '500cc • Liquide • EFI Double Papillon', '2026-09-16', '2026-09-30', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-30T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('0b5ca3ec-a901-4f64-aa0b-4529f513c8c0', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '5e97063e-676f-49ad-a646-e1bd5f064dc9', 'VMS2026DZ000048', 'Noir Mat', '125cc • Air • Carburateur optimisé', '2026-06-17', '2026-07-01', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-07-01T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('58cdb5af-12b4-4f9d-a771-4bca44557adf', '3b2af5ef-3d15-4188-a1a0-af7e7c841740', '98ea0cae-8457-4e21-aa3c-2ffccfbfe225', 'VMS2026DZ000049', 'Blanc Nacre', '150cc • Liquide • EFI Delphi', '2026-09-14', '2026-09-28', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-28T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('3bb67bcc-4392-4424-ac7c-0c1b90a61248', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '3a9b57ca-bb33-4f1f-a31c-76ac0a20e1f4', 'VMS2026DZ000050', 'Gris Titane', '110cc • Air • Carburateur', '2026-09-13', '2026-09-27', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-27T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('0d99982e-ed8a-4365-a756-8592af828a0d', '1cb3c954-cce8-4a24-a4d7-13ccc2022428', '4123be06-d726-48d3-a1e9-880e315bb8ce', 'VMS2026DZ000051', 'Bleu Nuit', '125cc • Air • Carburateur', '2026-09-12', '2026-09-26', 'in_transfer', 'Contrôle qualité VMS usine validé', NULL, '2026-09-26T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('5d4451b9-5a8d-462a-a07e-42458a3fec78', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', 'dad48ee7-3b7a-4648-a6dc-c78bfadf9c8d', 'VMS2026DZ000052', 'Rouge VMS Racing', '175cc • Liquide • EFI Bosch', '2026-06-13', '2026-06-27', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-06-27T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('bd5e7e5e-3c93-4571-a8bf-ca77f444879c', '6670c650-fefe-4b76-ac42-e3b7e60d10bf', 'f378804f-e6bf-424d-acaa-2fcd84b9edc4', 'VMS2026DZ000053', 'Jaune Sport', '150cc • Air forcé • EFI', '2026-09-10', '2026-09-24', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-24T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('7a62f4df-4530-4afb-a61d-75fc0146a24d', 'efe00453-2df4-467f-a177-0484ee609660', '34b0ef86-f8cb-4343-aa56-a859e85b3453', 'VMS2026DZ000054', 'Noir Mat', '125cc • Liquide • EFI', '2026-09-09', '2026-09-23', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-23T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('778c3f4f-1e81-4316-ab79-acf04c7ff08b', '8fa80271-7cbe-43f2-a6a1-49d0db410fa2', 'fc0b2cc8-e9b0-4f8c-a488-cae893ac865a', 'VMS2026DZ000055', 'Blanc Nacre', '500cc • Liquide • EFI Double Papillon', '2026-09-08', '2026-09-22', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-22T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('7b0741d1-5f5a-4849-a77a-0c7bf63954c8', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', 'f7e49757-a156-4cae-ac34-3d95b3a5a07f', 'VMS2026DZ000056', 'Gris Titane', '125cc • Air • Carburateur optimisé', '2026-06-09', '2026-06-23', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-06-23T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('481851c3-f2c4-45fd-aa1e-02a01cd0fbb3', '3b2af5ef-3d15-4188-a1a0-af7e7c841740', '26d2ced3-df2f-4678-a147-084eb4c49e74', 'VMS2026DZ000057', 'Bleu Nuit', '150cc • Liquide • EFI Delphi', '2026-09-06', '2026-09-20', 'sold', 'Contrôle qualité VMS usine validé', '2026-11-18', '2026-09-20T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('d0faf83f-eb50-4497-a588-8a067a2c58fc', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '9f61311a-0570-45da-a139-1af7310ee621', 'VMS2026DZ000058', 'Rouge VMS Racing', '110cc • Air • Carburateur', '2026-09-05', '2026-09-19', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-19T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('39768d28-411c-40a0-a3b7-829b2b455155', '1cb3c954-cce8-4a24-a4d7-13ccc2022428', '6b9616e8-ee73-4bfb-ac35-3af33cfaa291', 'VMS2026DZ000059', 'Jaune Sport', '125cc • Air • Carburateur', '2026-09-04', '2026-09-18', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-18T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('2eae861c-db0b-4be5-a7d8-8dd2846c7af4', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', 'b5999971-764e-4820-ac92-a9fcedac3ddd', 'VMS2026DZ000060', 'Noir Mat', '175cc • Liquide • EFI Bosch', '2026-06-05', '2026-06-19', 'reserved', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-06-19T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('c6a5ab89-6658-4431-a999-9d6404c89c71', '6670c650-fefe-4b76-ac42-e3b7e60d10bf', 'f4218e19-c304-4edb-aada-99dcd48a5841', 'VMS2026DZ000061', 'Blanc Nacre', '150cc • Air forcé • EFI', '2026-09-02', '2026-09-16', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-16T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('13000d24-405d-4a56-a59d-76a2a3d51fc5', 'efe00453-2df4-467f-a177-0484ee609660', '7d229d91-01ea-47a2-a575-3e287086a811', 'VMS2026DZ000062', 'Gris Titane', '125cc • Liquide • EFI', '2026-09-01', '2026-09-15', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-15T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('e91f14b0-301c-4741-af61-605f5f32b12f', '8fa80271-7cbe-43f2-a6a1-49d0db410fa2', '93560a52-18cc-4497-a06f-7ee7890b1c47', 'VMS2026DZ000063', 'Bleu Nuit', '500cc • Liquide • EFI Double Papillon', '2026-08-31', '2026-09-14', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-14T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('bce8ed33-25e9-4fe7-a95d-a3d3d2216740', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', 'b424369f-e9ad-4839-a8e1-bd2baf669364', 'VMS2026DZ000064', 'Rouge VMS Racing', '125cc • Air • Carburateur optimisé', '2026-06-01', '2026-06-15', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-06-15T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('4d1a9ecd-5605-4739-a7aa-5abbb9c0d355', '3b2af5ef-3d15-4188-a1a0-af7e7c841740', 'f5efa6f8-3b54-4637-a6e3-487ce8f7ec9f', 'VMS2026DZ000065', 'Jaune Sport', '150cc • Liquide • EFI Delphi', '2026-08-29', '2026-09-12', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-12T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('2e482458-f291-45a5-a9b4-92dee30db19d', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '8ff16520-7741-4dc8-ab0b-609246f7cab8', 'VMS2026DZ000066', 'Noir Mat', '110cc • Air • Carburateur', '2026-08-28', '2026-09-11', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-11T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('455b1ee4-735a-4820-aecd-2306150aed05', '1cb3c954-cce8-4a24-a4d7-13ccc2022428', 'b5eb4bf2-7163-4399-aebe-cb7d68396a1f', 'VMS2026DZ000067', 'Blanc Nacre', '125cc • Air • Carburateur', '2026-08-27', '2026-09-10', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-10T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('47721ed5-d9d9-4f09-a42f-c7aa22326424', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '706f9042-5247-4a7d-a617-8c2a3116d45d', 'VMS2026DZ000068', 'Gris Titane', '175cc • Liquide • EFI Bosch', '2026-05-28', '2026-06-11', 'in_transfer', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-06-11T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('06d8e262-7e45-41d0-a857-87efe974b243', '6670c650-fefe-4b76-ac42-e3b7e60d10bf', '8d9bc5c6-0173-432d-a16e-318ec32c2ebc', 'VMS2026DZ000069', 'Bleu Nuit', '150cc • Air forcé • EFI', '2026-08-25', '2026-09-08', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-08T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('d71d726f-cfec-43c9-a0be-60e99dd442c8', 'efe00453-2df4-467f-a177-0484ee609660', 'fa423083-354f-4fd7-af54-6d3cc4370276', 'VMS2026DZ000070', 'Rouge VMS Racing', '125cc • Liquide • EFI', '2026-08-24', '2026-09-07', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-07T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('72cad149-83e7-4625-aa0e-671c7392c896', '8fa80271-7cbe-43f2-a6a1-49d0db410fa2', '202c7f95-9694-4e2a-a7ca-8f72a327e96c', 'VMS2026DZ000071', 'Jaune Sport', '500cc • Liquide • EFI Double Papillon', '2026-08-23', '2026-09-06', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-06T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('795d30b3-b4d5-4c1e-a63e-9443b0c47662', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '95fecef8-36b9-4792-a84d-b72574928187', 'VMS2026DZ000072', 'Noir Mat', '125cc • Air • Carburateur optimisé', '2026-05-24', '2026-06-07', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-06-07T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('017dfe68-846c-4e6e-a15d-82265d505f78', '3b2af5ef-3d15-4188-a1a0-af7e7c841740', '681c3797-0542-472c-a879-fc278802c8d0', 'VMS2026DZ000073', 'Blanc Nacre', '150cc • Liquide • EFI Delphi', '2026-08-21', '2026-09-04', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-04T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('c1879674-981f-4368-a405-392f5a4a8fe3', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', 'aff8edac-6fca-49fd-a509-62c64bf4a7a2', 'VMS2026DZ000074', 'Gris Titane', '110cc • Air • Carburateur', '2026-08-20', '2026-09-03', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-03T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('3bf2b26d-f05c-4a86-afa9-6b7122567601', '1cb3c954-cce8-4a24-a4d7-13ccc2022428', '0c1b8b25-ca33-40e2-a110-28bde506e2c8', 'VMS2026DZ000075', 'Bleu Nuit', '125cc • Air • Carburateur', '2026-11-02', '2026-11-16', 'reserved', 'Contrôle qualité VMS usine validé', NULL, '2026-11-16T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('f95ad5bf-7b3a-4ea7-ae56-9f5738134420', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '44a8212b-d633-4b1f-ac98-ab12de68bcd2', 'VMS2026DZ000076', 'Rouge VMS Racing', '175cc • Liquide • EFI Bosch', '2026-05-20', '2026-06-03', 'sold', 'Stock dormant éligible Compte Global (>90j)', '2026-11-18', '2026-06-03T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('400c101b-192a-4516-adee-2e07176d5bfb', '6670c650-fefe-4b76-ac42-e3b7e60d10bf', '7e8227ea-92b3-4ff3-af75-2ba2956b6e54', 'VMS2026DZ000077', 'Jaune Sport', '150cc • Air forcé • EFI', '2026-10-31', '2026-11-14', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-14T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('f2997765-2b77-4d30-aee8-5b3106560abd', 'efe00453-2df4-467f-a177-0484ee609660', '5fd21885-958b-4486-a040-dbc06353a06b', 'VMS2026DZ000078', 'Noir Mat', '125cc • Liquide • EFI', '2026-10-30', '2026-11-13', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-13T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('e6f68fb3-1c23-4a00-a200-71847da7b926', '8fa80271-7cbe-43f2-a6a1-49d0db410fa2', 'ba4312b1-7ed3-4d02-a70c-9f64e10e93c6', 'VMS2026DZ000079', 'Blanc Nacre', '500cc • Liquide • EFI Double Papillon', '2026-10-29', '2026-11-12', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-12T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('ce2dd2ae-1629-40e7-a3f2-828ffc46703f', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', 'a1151a33-c181-4f15-ae21-d1143083fe9b', 'VMS2026DZ000080', 'Gris Titane', '125cc • Air • Carburateur optimisé', '2026-05-16', '2026-05-30', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-05-30T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('16d663a6-3756-4f39-aa01-ecd3b23fdc32', '3b2af5ef-3d15-4188-a1a0-af7e7c841740', '894255e4-c95e-4fd0-ac78-d99da96abdf5', 'VMS2026DZ000081', 'Bleu Nuit', '150cc • Liquide • EFI Delphi', '2026-10-27', '2026-11-10', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-10T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('8e2b3cc5-db92-4f31-adcc-9a7de6715280', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '888f1d4d-a5c8-45af-ac55-7bdd7a43a467', 'VMS2026DZ000082', 'Rouge VMS Racing', '110cc • Air • Carburateur', '2026-10-26', '2026-11-09', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-09T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('1c0e554d-ea00-4c50-ab86-c957987385c3', '1cb3c954-cce8-4a24-a4d7-13ccc2022428', '0112ec21-a591-42ad-af2d-b766685906a0', 'VMS2026DZ000083', 'Jaune Sport', '125cc • Air • Carburateur', '2026-10-25', '2026-11-08', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-08T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('5877c147-29c0-457b-ab0d-dab86f22dcde', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '81154d42-2237-4ddd-a95f-e70dd0795b96', 'VMS2026DZ000084', 'Noir Mat', '175cc • Liquide • EFI Bosch', '2026-05-12', '2026-05-26', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-05-26T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('f3d7961a-83c3-49e3-a9ff-c4eec8f0e572', '6670c650-fefe-4b76-ac42-e3b7e60d10bf', 'c1e837c2-e597-445a-a434-3f431684505f', 'VMS2026DZ000085', 'Blanc Nacre', '150cc • Air forcé • EFI', '2026-10-23', '2026-11-06', 'in_transfer', 'Contrôle qualité VMS usine validé', NULL, '2026-11-06T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('92a4b19e-daf8-48d9-aac8-7b2c2c600931', 'efe00453-2df4-467f-a177-0484ee609660', '2604f326-16d0-4e0d-a642-369d57b5baf3', 'VMS2026DZ000086', 'Gris Titane', '125cc • Liquide • EFI', '2026-10-22', '2026-11-05', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-05T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('a5955f17-e3cc-45d2-a8d9-899198d194dc', '8fa80271-7cbe-43f2-a6a1-49d0db410fa2', '690a1d9c-3454-48a9-a855-d96d4ebcfc63', 'VMS2026DZ000087', 'Bleu Nuit', '500cc • Liquide • EFI Double Papillon', '2026-10-21', '2026-11-04', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-04T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('2f7f0a64-d2a2-4754-a16b-f5aa631224a8', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '88d541ce-eb77-491b-ac5a-a72f9e548772', 'VMS2026DZ000088', 'Rouge VMS Racing', '125cc • Air • Carburateur optimisé', '2026-08-01', '2026-08-15', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-08-15T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('58a3ddc8-6e80-449a-ae56-62757c0061df', '3b2af5ef-3d15-4188-a1a0-af7e7c841740', 'f5e1d4eb-cbc1-49dc-a6c7-b696f13675bf', 'VMS2026DZ000089', 'Jaune Sport', '150cc • Liquide • EFI Delphi', '2026-10-19', '2026-11-02', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-02T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('5d4a7bc5-2ffb-4e69-a0d2-96bf5da6fd31', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', 'c6ec9f5b-132d-41d9-a13d-3459935c3ade', 'VMS2026DZ000090', 'Noir Mat', '110cc • Air • Carburateur', '2026-10-18', '2026-11-01', 'reserved', 'Contrôle qualité VMS usine validé', NULL, '2026-11-01T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('32b83883-2fe9-4cd9-a26e-719fd9f5b8da', '1cb3c954-cce8-4a24-a4d7-13ccc2022428', '37f82d93-cafd-4f41-af5f-1508b0b3b8f9', 'VMS2026DZ000091', 'Blanc Nacre', '125cc • Air • Carburateur', '2026-10-17', '2026-10-31', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-31T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('64baf8f0-7011-4b02-a81b-c7cae4605625', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', 'e9de928b-17a6-44e6-ae14-0942fb6fa85c', 'VMS2026DZ000092', 'Gris Titane', '175cc • Liquide • EFI Bosch', '2026-07-28', '2026-08-11', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-08-11T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('dbb19def-b4e5-456c-afea-b636cbc6905f', '6670c650-fefe-4b76-ac42-e3b7e60d10bf', '4074181c-2e0e-4a3f-aedc-871b250b89a5', 'VMS2026DZ000093', 'Bleu Nuit', '150cc • Air forcé • EFI', '2026-10-15', '2026-10-29', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-29T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('19c43777-a97a-4528-a519-1f5355f346af', 'efe00453-2df4-467f-a177-0484ee609660', '20abf9d5-4a87-4a53-a1df-3589f9e9e9c6', 'VMS2026DZ000094', 'Rouge VMS Racing', '125cc • Liquide • EFI', '2026-10-14', '2026-10-28', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-28T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('7f11fb0a-7e03-417f-ac62-1ff0c4dcdba7', '8fa80271-7cbe-43f2-a6a1-49d0db410fa2', '654a20b5-3c93-47e1-aa05-b9cb364e463f', 'VMS2026DZ000095', 'Jaune Sport', '500cc • Liquide • EFI Double Papillon', '2026-10-13', '2026-10-27', 'sold', 'Contrôle qualité VMS usine validé', '2026-11-18', '2026-10-27T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('09ed5615-5696-48ce-afb1-80853cf971b7', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', 'c4ad5610-eefc-4d85-ab1b-be67e397aeb6', 'VMS2026DZ000096', 'Noir Mat', '125cc • Air • Carburateur optimisé', '2026-07-24', '2026-08-07', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-08-07T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('0938d8d0-aa4f-42ea-a4b9-27efbaeb7caa', '3b2af5ef-3d15-4188-a1a0-af7e7c841740', 'c70bbe23-02c5-486e-ab34-be528137d4df', 'VMS2026DZ000097', 'Blanc Nacre', '150cc • Liquide • EFI Delphi', '2026-10-11', '2026-10-25', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-25T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('7b624b78-40fc-4936-a913-6bc8411c2176', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '21db1b6e-f688-4a53-ac97-e05973bbda8d', 'VMS2026DZ000098', 'Gris Titane', '110cc • Air • Carburateur', '2026-10-10', '2026-10-24', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-24T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('a96a071a-6b8a-4555-a63b-c8c223d69aec', '1cb3c954-cce8-4a24-a4d7-13ccc2022428', '256f8a1b-b5e7-4991-a728-02b869440477', 'VMS2026DZ000099', 'Bleu Nuit', '125cc • Air • Carburateur', '2026-10-09', '2026-10-23', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-23T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('61f27fe5-3384-4dbc-a267-6acd40f6d4ca', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', 'bc78aed8-b4b8-4716-abf9-2cd78cdb1660', 'VMS2026DZ000100', 'Rouge VMS Racing', '175cc • Liquide • EFI Bosch', '2026-07-20', '2026-08-03', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-08-03T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('04e054a6-3867-4496-a510-7c09923fd7e0', '6670c650-fefe-4b76-ac42-e3b7e60d10bf', '00a4e5aa-aeee-403f-af1c-1f8b058c4e12', 'VMS2026DZ000101', 'Jaune Sport', '150cc • Air forcé • EFI', '2026-10-07', '2026-10-21', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-21T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('d9ff8115-cc08-431a-a7d8-bc8be48ecb6d', 'efe00453-2df4-467f-a177-0484ee609660', '3f6f6575-5045-47c0-a7e2-ade1882ce203', 'VMS2026DZ000102', 'Noir Mat', '125cc • Liquide • EFI', '2026-10-06', '2026-10-20', 'in_transfer', 'Contrôle qualité VMS usine validé', NULL, '2026-10-20T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('65f0e892-23ab-4a24-adf2-56f6850dba06', '8fa80271-7cbe-43f2-a6a1-49d0db410fa2', 'c80536ee-471f-4432-ab52-27ba8d3143fe', 'VMS2026DZ000103', 'Blanc Nacre', '500cc • Liquide • EFI Double Papillon', '2026-10-05', '2026-10-19', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-19T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('6aa4ed35-9bd2-437d-a830-04a055f8bc8b', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '2f39d314-009b-4140-a754-d370518155e7', 'VMS2026DZ000104', 'Gris Titane', '125cc • Air • Carburateur optimisé', '2026-07-16', '2026-07-30', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-07-30T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('297be197-8821-4acb-ac7f-0c430034b058', '3b2af5ef-3d15-4188-a1a0-af7e7c841740', 'f4e92145-68b7-4af7-a672-343e85e5f413', 'VMS2026DZ000105', 'Bleu Nuit', '150cc • Liquide • EFI Delphi', '2026-10-03', '2026-10-17', 'reserved', 'Contrôle qualité VMS usine validé', NULL, '2026-10-17T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('923705b5-9599-4234-a887-395f0f5597ae', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', 'ddde321b-ba24-45cd-a181-6c726ffb3cab', 'VMS2026DZ000106', 'Rouge VMS Racing', '110cc • Air • Carburateur', '2026-10-02', '2026-10-16', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-16T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('e3d5f65d-fcd6-4dac-aa6d-ae3c71ab3cbf', '1cb3c954-cce8-4a24-a4d7-13ccc2022428', '318aa009-a953-4107-a027-41fc3e3379b1', 'VMS2026DZ000107', 'Jaune Sport', '125cc • Air • Carburateur', '2026-10-01', '2026-10-15', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-15T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('a7f0eab7-f50c-4ca8-a953-141628e3491a', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', 'c13d2978-83d8-49b3-a4fe-93e92b1fc07f', 'VMS2026DZ000108', 'Noir Mat', '175cc • Liquide • EFI Bosch', '2026-07-12', '2026-07-26', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-07-26T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('a66f6dca-431a-4502-a4b6-aed8753b8a62', '6670c650-fefe-4b76-ac42-e3b7e60d10bf', '4d07418a-529d-4f69-a3bb-55da145e018a', 'VMS2026DZ000109', 'Blanc Nacre', '150cc • Air forcé • EFI', '2026-09-29', '2026-10-13', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-13T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('120a37c3-8737-4f54-a997-5c1c14312212', 'efe00453-2df4-467f-a177-0484ee609660', '5a00a329-92b0-48bb-a53b-2403b54a9696', 'VMS2026DZ000110', 'Gris Titane', '125cc • Liquide • EFI', '2026-09-28', '2026-10-12', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-12T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('5db4a3d7-b87c-4938-ac95-bface4e2a28d', '8fa80271-7cbe-43f2-a6a1-49d0db410fa2', 'd6c883f8-c7df-4b55-a711-25fcc9a5cb13', 'VMS2026DZ000111', 'Bleu Nuit', '500cc • Liquide • EFI Double Papillon', '2026-09-27', '2026-10-11', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-11T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('c83f1e55-2005-47a9-a71f-b4df603ee5ce', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '24c1efb6-43f6-41f9-a1ae-8602a4ffb00b', 'VMS2026DZ000112', 'Rouge VMS Racing', '125cc • Air • Carburateur optimisé', '2026-07-08', '2026-07-22', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-07-22T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('465bf203-c71d-4b87-aea2-97cbacedc019', '3b2af5ef-3d15-4188-a1a0-af7e7c841740', '437e31eb-4fec-4c07-a445-5844ff86bf98', 'VMS2026DZ000113', 'Jaune Sport', '150cc • Liquide • EFI Delphi', '2026-09-25', '2026-10-09', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-09T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('a26fa15c-c316-4778-a4d9-1bc91e8f0775', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '7f3131b5-6b4c-4390-a01f-6e5ce2744647', 'VMS2026DZ000114', 'Noir Mat', '110cc • Air • Carburateur', '2026-09-24', '2026-10-08', 'sold', 'Contrôle qualité VMS usine validé', '2026-11-18', '2026-10-08T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('50ec5e75-afda-4a5c-a1b2-e162dc59b398', '1cb3c954-cce8-4a24-a4d7-13ccc2022428', '6676117f-09a1-4fe6-ad91-c5be0787fe7a', 'VMS2026DZ000115', 'Blanc Nacre', '125cc • Air • Carburateur', '2026-09-23', '2026-10-07', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-07T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('dc6e7ae0-b51d-4acd-a7ea-0ac54710b78b', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '960b7501-9ca5-49cd-a5d2-2aec63e297cf', 'VMS2026DZ000116', 'Gris Titane', '175cc • Liquide • EFI Bosch', '2026-07-04', '2026-07-18', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-07-18T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('b73c2af8-83a7-4dc1-aa19-b5e15a7cfba4', '6670c650-fefe-4b76-ac42-e3b7e60d10bf', 'edbb8233-80cb-4410-ae3f-65f0e5455e71', 'VMS2026DZ000117', 'Bleu Nuit', '150cc • Air forcé • EFI', '2026-09-21', '2026-10-05', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-05T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('87780eae-b8bc-4e4f-a421-4ed29c405033', 'efe00453-2df4-467f-a177-0484ee609660', '9b57ebb3-4567-46dd-a03f-7833f6959606', 'VMS2026DZ000118', 'Rouge VMS Racing', '125cc • Liquide • EFI', '2026-09-20', '2026-10-04', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-04T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('a9763b9b-14c4-4489-aced-fdd4ff38389f', '8fa80271-7cbe-43f2-a6a1-49d0db410fa2', 'ced756da-4380-41b2-adad-65d1de43d461', 'VMS2026DZ000119', 'Jaune Sport', '500cc • Liquide • EFI Double Papillon', '2026-09-19', '2026-10-03', 'in_transfer', 'Contrôle qualité VMS usine validé', NULL, '2026-10-03T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('e884b233-19e1-4907-afe5-a8a9788f4b40', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '007d212c-d706-4db5-af1c-75bbf3eb35d9', 'VMS2026DZ000120', 'Noir Mat', '125cc • Air • Carburateur optimisé', '2026-06-30', '2026-07-14', 'reserved', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-07-14T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('d6477bb6-42ce-4ce0-a33f-15307ffc35a7', '3b2af5ef-3d15-4188-a1a0-af7e7c841740', '04a0a795-3b9d-4fbb-a974-c98ef044a2ab', 'VMS2026DZ000121', 'Blanc Nacre', '150cc • Liquide • EFI Delphi', '2026-09-17', '2026-10-01', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-01T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('0f23359c-e139-452e-ad5d-a5bd5deb7cc5', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '472ef702-ed6d-4dea-aefe-8880c99dc9cd', 'VMS2026DZ000122', 'Gris Titane', '110cc • Air • Carburateur', '2026-09-16', '2026-09-30', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-30T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('89b3ac87-978e-4e0c-ad7c-eeb143aad261', '1cb3c954-cce8-4a24-a4d7-13ccc2022428', 'b0d23458-9fde-4915-aa61-865751368634', 'VMS2026DZ000123', 'Bleu Nuit', '125cc • Air • Carburateur', '2026-09-15', '2026-09-29', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-29T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('9b1db83e-9365-4f62-a916-7e56ea189f6c', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', 'd189e080-175c-4d64-ae46-cc884633d2f5', 'VMS2026DZ000124', 'Rouge VMS Racing', '175cc • Liquide • EFI Bosch', '2026-06-26', '2026-07-10', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-07-10T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('3ea86c54-a893-4552-aeca-7753b7b067b4', '6670c650-fefe-4b76-ac42-e3b7e60d10bf', 'fec556c3-9e83-4ab6-aeaf-2b446e6fed2c', 'VMS2026DZ000125', 'Jaune Sport', '150cc • Air forcé • EFI', '2026-09-13', '2026-09-27', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-27T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('68c8db99-e40f-45bf-aa62-f592e961376c', 'efe00453-2df4-467f-a177-0484ee609660', '0cd6bd05-9568-49ac-a0bb-a9de9206e548', 'VMS2026DZ000126', 'Noir Mat', '125cc • Liquide • EFI', '2026-09-12', '2026-09-26', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-26T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('c226a748-e480-4ad9-a01f-2b38f5006706', '8fa80271-7cbe-43f2-a6a1-49d0db410fa2', 'dafa8f2d-2471-4a5d-a0c6-24cd172fa668', 'VMS2026DZ000127', 'Blanc Nacre', '500cc • Liquide • EFI Double Papillon', '2026-09-11', '2026-09-25', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-25T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('2c4707a1-7c69-4977-a78c-627a638cfe70', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '5e97063e-676f-49ad-a646-e1bd5f064dc9', 'VMS2026DZ000128', 'Gris Titane', '125cc • Air • Carburateur optimisé', '2026-06-22', '2026-07-06', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-07-06T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('98bd37c1-f0ae-4d81-aadb-184162e9e811', '3b2af5ef-3d15-4188-a1a0-af7e7c841740', '98ea0cae-8457-4e21-aa3c-2ffccfbfe225', 'VMS2026DZ000129', 'Bleu Nuit', '150cc • Liquide • EFI Delphi', '2026-09-09', '2026-09-23', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-23T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('2e506487-c244-4047-ad64-49a1de3d9c57', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '3a9b57ca-bb33-4f1f-a31c-76ac0a20e1f4', 'VMS2026DZ000130', 'Rouge VMS Racing', '110cc • Air • Carburateur', '2026-09-08', '2026-09-22', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-22T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('9dc9635e-e68b-4855-a465-aa1698b289aa', '1cb3c954-cce8-4a24-a4d7-13ccc2022428', '4123be06-d726-48d3-a1e9-880e315bb8ce', 'VMS2026DZ000131', 'Jaune Sport', '125cc • Air • Carburateur', '2026-09-07', '2026-09-21', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-21T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('9c50323c-5fba-411d-a0f7-7ee53eec59e3', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', 'dad48ee7-3b7a-4648-a6dc-c78bfadf9c8d', 'VMS2026DZ000132', 'Noir Mat', '175cc • Liquide • EFI Bosch', '2026-06-18', '2026-07-02', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-07-02T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('19a8cda6-4344-4606-a827-723f152d7aa8', '6670c650-fefe-4b76-ac42-e3b7e60d10bf', 'f378804f-e6bf-424d-acaa-2fcd84b9edc4', 'VMS2026DZ000133', 'Blanc Nacre', '150cc • Air forcé • EFI', '2026-09-05', '2026-09-19', 'sold', 'Contrôle qualité VMS usine validé', '2026-11-18', '2026-09-19T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('b081000f-64e8-43d7-a2f2-10386ecb996b', 'efe00453-2df4-467f-a177-0484ee609660', '34b0ef86-f8cb-4343-aa56-a859e85b3453', 'VMS2026DZ000134', 'Gris Titane', '125cc • Liquide • EFI', '2026-09-04', '2026-09-18', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-18T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('a458d18a-5fec-4cea-ae5e-7498f420b5c3', '8fa80271-7cbe-43f2-a6a1-49d0db410fa2', 'fc0b2cc8-e9b0-4f8c-a488-cae893ac865a', 'VMS2026DZ000135', 'Bleu Nuit', '500cc • Liquide • EFI Double Papillon', '2026-09-03', '2026-09-17', 'reserved', 'Contrôle qualité VMS usine validé', NULL, '2026-09-17T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('3fc77e0d-e30c-4cfc-a7d3-1adefc82a067', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', 'f7e49757-a156-4cae-ac34-3d95b3a5a07f', 'VMS2026DZ000136', 'Rouge VMS Racing', '125cc • Air • Carburateur optimisé', '2026-06-14', '2026-06-28', 'in_transfer', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-06-28T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('43b3808a-e284-4766-ad41-b0ac4696d0c2', '3b2af5ef-3d15-4188-a1a0-af7e7c841740', '26d2ced3-df2f-4678-a147-084eb4c49e74', 'VMS2026DZ000137', 'Jaune Sport', '150cc • Liquide • EFI Delphi', '2026-09-01', '2026-09-15', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-15T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('f46be9ea-9f14-4ad5-ab56-d7c3382fc880', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '9f61311a-0570-45da-a139-1af7310ee621', 'VMS2026DZ000138', 'Noir Mat', '110cc • Air • Carburateur', '2026-08-31', '2026-09-14', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-14T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('a6b6bdf3-001b-4115-a394-b23d357b1bfa', '1cb3c954-cce8-4a24-a4d7-13ccc2022428', '6b9616e8-ee73-4bfb-ac35-3af33cfaa291', 'VMS2026DZ000139', 'Blanc Nacre', '125cc • Air • Carburateur', '2026-08-30', '2026-09-13', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-13T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('53e98d5c-3b0c-4e80-a8b5-5d8706854db0', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', 'b5999971-764e-4820-ac92-a9fcedac3ddd', 'VMS2026DZ000140', 'Gris Titane', '175cc • Liquide • EFI Bosch', '2026-06-10', '2026-06-24', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-06-24T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('a5aa13a3-1973-4e26-aa6e-df4056f689be', '6670c650-fefe-4b76-ac42-e3b7e60d10bf', 'f4218e19-c304-4edb-aada-99dcd48a5841', 'VMS2026DZ000141', 'Bleu Nuit', '150cc • Air forcé • EFI', '2026-08-28', '2026-09-11', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-11T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('fd1e41a8-2729-4ca1-ac3e-6340509876de', 'efe00453-2df4-467f-a177-0484ee609660', '7d229d91-01ea-47a2-a575-3e287086a811', 'VMS2026DZ000142', 'Rouge VMS Racing', '125cc • Liquide • EFI', '2026-08-27', '2026-09-10', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-10T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('b3e918fc-22e2-48ff-a26f-8f7f86358af6', '8fa80271-7cbe-43f2-a6a1-49d0db410fa2', '93560a52-18cc-4497-a06f-7ee7890b1c47', 'VMS2026DZ000143', 'Jaune Sport', '500cc • Liquide • EFI Double Papillon', '2026-08-26', '2026-09-09', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-09T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('44d0f8c8-eb03-49f1-af03-073e5ac52aca', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', 'b424369f-e9ad-4839-a8e1-bd2baf669364', 'VMS2026DZ000144', 'Noir Mat', '125cc • Air • Carburateur optimisé', '2026-06-06', '2026-06-20', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-06-20T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('3151180b-90f7-45ea-a9fe-770cbcd38f3f', '3b2af5ef-3d15-4188-a1a0-af7e7c841740', 'f5efa6f8-3b54-4637-a6e3-487ce8f7ec9f', 'VMS2026DZ000145', 'Blanc Nacre', '150cc • Liquide • EFI Delphi', '2026-08-24', '2026-09-07', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-07T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('be38779f-9d75-4ad9-aaf7-b4f22437fd76', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '8ff16520-7741-4dc8-ab0b-609246f7cab8', 'VMS2026DZ000146', 'Gris Titane', '110cc • Air • Carburateur', '2026-08-23', '2026-09-06', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-06T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('19732d3f-ad15-4306-af28-90e0fb59e476', '1cb3c954-cce8-4a24-a4d7-13ccc2022428', 'b5eb4bf2-7163-4399-aebe-cb7d68396a1f', 'VMS2026DZ000147', 'Bleu Nuit', '125cc • Air • Carburateur', '2026-08-22', '2026-09-05', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-05T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('0e558881-09f9-480a-affd-6932a8999188', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '706f9042-5247-4a7d-a617-8c2a3116d45d', 'VMS2026DZ000148', 'Rouge VMS Racing', '175cc • Liquide • EFI Bosch', '2026-06-02', '2026-06-16', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-06-16T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('1625a46c-a46e-44b5-aedd-72583bd8075c', '6670c650-fefe-4b76-ac42-e3b7e60d10bf', '8d9bc5c6-0173-432d-a16e-318ec32c2ebc', 'VMS2026DZ000149', 'Jaune Sport', '150cc • Air forcé • EFI', '2026-08-20', '2026-09-03', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-03T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('38f55cf9-35a7-48f5-afce-365737c8abb3', 'efe00453-2df4-467f-a177-0484ee609660', 'fa423083-354f-4fd7-af54-6d3cc4370276', 'VMS2026DZ000150', 'Noir Mat', '125cc • Liquide • EFI', '2026-11-02', '2026-11-16', 'reserved', 'Contrôle qualité VMS usine validé', NULL, '2026-11-16T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('1645184f-5871-49dc-a2c0-46e3c273a144', '8fa80271-7cbe-43f2-a6a1-49d0db410fa2', '202c7f95-9694-4e2a-a7ca-8f72a327e96c', 'VMS2026DZ000151', 'Blanc Nacre', '500cc • Liquide • EFI Double Papillon', '2026-11-01', '2026-11-15', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-15T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('07881893-81f0-44f0-ab73-ad429e0d09b0', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '95fecef8-36b9-4792-a84d-b72574928187', 'VMS2026DZ000152', 'Gris Titane', '125cc • Air • Carburateur optimisé', '2026-05-29', '2026-06-12', 'sold', 'Stock dormant éligible Compte Global (>90j)', '2026-11-18', '2026-06-12T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('375e13a5-8f61-4ed4-a670-c68d27476008', '3b2af5ef-3d15-4188-a1a0-af7e7c841740', '681c3797-0542-472c-a879-fc278802c8d0', 'VMS2026DZ000153', 'Bleu Nuit', '150cc • Liquide • EFI Delphi', '2026-10-30', '2026-11-13', 'in_transfer', 'Contrôle qualité VMS usine validé', NULL, '2026-11-13T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('5650adbd-9782-4447-ae49-e2fdb31ef5dc', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', 'aff8edac-6fca-49fd-a509-62c64bf4a7a2', 'VMS2026DZ000154', 'Rouge VMS Racing', '110cc • Air • Carburateur', '2026-10-29', '2026-11-12', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-12T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('a5d9d86c-ef55-4b1a-a6b5-372abb3eea28', '1cb3c954-cce8-4a24-a4d7-13ccc2022428', '0c1b8b25-ca33-40e2-a110-28bde506e2c8', 'VMS2026DZ000155', 'Jaune Sport', '125cc • Air • Carburateur', '2026-10-28', '2026-11-11', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-11T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('28b9a3ac-b600-4018-a64f-56e0c5a57427', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '44a8212b-d633-4b1f-ac98-ab12de68bcd2', 'VMS2026DZ000156', 'Noir Mat', '175cc • Liquide • EFI Bosch', '2026-05-25', '2026-06-08', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-06-08T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('8cc7da1d-d1e5-4e8a-a946-60d608f7fa70', '6670c650-fefe-4b76-ac42-e3b7e60d10bf', '7e8227ea-92b3-4ff3-af75-2ba2956b6e54', 'VMS2026DZ000157', 'Blanc Nacre', '150cc • Air forcé • EFI', '2026-10-26', '2026-11-09', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-09T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('22a622a0-70c0-47ee-a528-347356e46274', 'efe00453-2df4-467f-a177-0484ee609660', '5fd21885-958b-4486-a040-dbc06353a06b', 'VMS2026DZ000158', 'Gris Titane', '125cc • Liquide • EFI', '2026-10-25', '2026-11-08', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-08T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('4f869977-b048-43a5-a524-abd33dfcf391', '8fa80271-7cbe-43f2-a6a1-49d0db410fa2', 'ba4312b1-7ed3-4d02-a70c-9f64e10e93c6', 'VMS2026DZ000159', 'Bleu Nuit', '500cc • Liquide • EFI Double Papillon', '2026-10-24', '2026-11-07', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-07T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('812c0954-f6ea-4433-a442-99d0b7e59679', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', 'a1151a33-c181-4f15-ae21-d1143083fe9b', 'VMS2026DZ000160', 'Rouge VMS Racing', '125cc • Air • Carburateur optimisé', '2026-05-21', '2026-06-04', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-06-04T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('f7de2139-16ea-4027-a10f-eab8473a9faa', '3b2af5ef-3d15-4188-a1a0-af7e7c841740', '894255e4-c95e-4fd0-ac78-d99da96abdf5', 'VMS2026DZ000161', 'Jaune Sport', '150cc • Liquide • EFI Delphi', '2026-10-22', '2026-11-05', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-05T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('accdfb62-4ab5-4dc5-a800-0e9f84914225', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '888f1d4d-a5c8-45af-ac55-7bdd7a43a467', 'VMS2026DZ000162', 'Noir Mat', '110cc • Air • Carburateur', '2026-10-21', '2026-11-04', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-04T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('e0adb836-4a98-4907-ac62-5456694aaf81', '1cb3c954-cce8-4a24-a4d7-13ccc2022428', '0112ec21-a591-42ad-af2d-b766685906a0', 'VMS2026DZ000163', 'Blanc Nacre', '125cc • Air • Carburateur', '2026-10-20', '2026-11-03', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-03T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('6c447ad6-739b-4c8f-af62-217eeaae6f79', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '81154d42-2237-4ddd-a95f-e70dd0795b96', 'VMS2026DZ000164', 'Gris Titane', '175cc • Liquide • EFI Bosch', '2026-05-17', '2026-05-31', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-05-31T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('7a948ac6-ed3c-4a32-a7e2-47620a2d0ac0', '6670c650-fefe-4b76-ac42-e3b7e60d10bf', 'c1e837c2-e597-445a-a434-3f431684505f', 'VMS2026DZ000165', 'Bleu Nuit', '150cc • Air forcé • EFI', '2026-10-18', '2026-11-01', 'reserved', 'Contrôle qualité VMS usine validé', NULL, '2026-11-01T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('653e97ec-50bd-4b8e-ac4e-b5205d039f47', 'efe00453-2df4-467f-a177-0484ee609660', '2604f326-16d0-4e0d-a642-369d57b5baf3', 'VMS2026DZ000166', 'Rouge VMS Racing', '125cc • Liquide • EFI', '2026-10-17', '2026-10-31', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-31T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('913ea0e6-9ab5-4664-aab4-de9dd49cc171', '8fa80271-7cbe-43f2-a6a1-49d0db410fa2', '690a1d9c-3454-48a9-a855-d96d4ebcfc63', 'VMS2026DZ000167', 'Jaune Sport', '500cc • Liquide • EFI Double Papillon', '2026-10-16', '2026-10-30', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-30T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('3a5828d4-fc3a-4160-a081-b014dfe52658', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '88d541ce-eb77-491b-ac5a-a72f9e548772', 'VMS2026DZ000168', 'Noir Mat', '125cc • Air • Carburateur optimisé', '2026-05-13', '2026-05-27', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-05-27T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('d843dee7-aef3-4e93-aeed-e87d38f46670', '3b2af5ef-3d15-4188-a1a0-af7e7c841740', 'f5e1d4eb-cbc1-49dc-a6c7-b696f13675bf', 'VMS2026DZ000169', 'Blanc Nacre', '150cc • Liquide • EFI Delphi', '2026-10-14', '2026-10-28', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-28T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('a68dfbd2-5e72-4e2d-a7ce-ed367c6db1de', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', 'c6ec9f5b-132d-41d9-a13d-3459935c3ade', 'VMS2026DZ000170', 'Gris Titane', '110cc • Air • Carburateur', '2026-10-13', '2026-10-27', 'in_transfer', 'Contrôle qualité VMS usine validé', NULL, '2026-10-27T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('a95733a2-eaa3-4549-a47e-f5d38ab12bdb', '1cb3c954-cce8-4a24-a4d7-13ccc2022428', '37f82d93-cafd-4f41-af5f-1508b0b3b8f9', 'VMS2026DZ000171', 'Bleu Nuit', '125cc • Air • Carburateur', '2026-10-12', '2026-10-26', 'sold', 'Contrôle qualité VMS usine validé', '2026-11-18', '2026-10-26T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('8dd7ad1f-62f9-4670-aee4-e125d3de60c8', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', 'e9de928b-17a6-44e6-ae14-0942fb6fa85c', 'VMS2026DZ000172', 'Rouge VMS Racing', '175cc • Liquide • EFI Bosch', '2026-08-02', '2026-08-16', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-08-16T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('f32df664-fc81-4172-a9c8-fa2ff0ae92f7', '6670c650-fefe-4b76-ac42-e3b7e60d10bf', '4074181c-2e0e-4a3f-aedc-871b250b89a5', 'VMS2026DZ000173', 'Jaune Sport', '150cc • Air forcé • EFI', '2026-10-10', '2026-10-24', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-24T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('2a32e82c-2a10-4420-ac75-5d3e00e091ae', 'efe00453-2df4-467f-a177-0484ee609660', '20abf9d5-4a87-4a53-a1df-3589f9e9e9c6', 'VMS2026DZ000174', 'Noir Mat', '125cc • Liquide • EFI', '2026-10-09', '2026-10-23', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-23T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('6d33d7d3-dee2-4030-a9ef-90f69099faa6', '8fa80271-7cbe-43f2-a6a1-49d0db410fa2', '654a20b5-3c93-47e1-aa05-b9cb364e463f', 'VMS2026DZ000175', 'Blanc Nacre', '500cc • Liquide • EFI Double Papillon', '2026-10-08', '2026-10-22', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-22T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('17b91ea7-e4b8-4b08-a33d-d3aadbbc4896', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', 'c4ad5610-eefc-4d85-ab1b-be67e397aeb6', 'VMS2026DZ000176', 'Gris Titane', '125cc • Air • Carburateur optimisé', '2026-07-29', '2026-08-12', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-08-12T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('d45706d4-d3ca-40fc-a9ba-da7f494b978a', '3b2af5ef-3d15-4188-a1a0-af7e7c841740', 'c70bbe23-02c5-486e-ab34-be528137d4df', 'VMS2026DZ000177', 'Bleu Nuit', '150cc • Liquide • EFI Delphi', '2026-10-06', '2026-10-20', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-20T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('51fd2e9c-4b75-48a6-ac08-597d8855fee0', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '21db1b6e-f688-4a53-ac97-e05973bbda8d', 'VMS2026DZ000178', 'Rouge VMS Racing', '110cc • Air • Carburateur', '2026-10-05', '2026-10-19', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-19T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('51784c7e-9461-4576-a5e5-ad970a45740c', '1cb3c954-cce8-4a24-a4d7-13ccc2022428', '256f8a1b-b5e7-4991-a728-02b869440477', 'VMS2026DZ000179', 'Jaune Sport', '125cc • Air • Carburateur', '2026-10-04', '2026-10-18', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-18T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('419bf99e-5ae5-4e19-a9d7-3bd079533cc6', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', 'bc78aed8-b4b8-4716-abf9-2cd78cdb1660', 'VMS2026DZ000180', 'Noir Mat', '175cc • Liquide • EFI Bosch', '2026-07-25', '2026-08-08', 'reserved', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-08-08T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('bd056681-63e2-42be-a89d-61c59a9cabc2', '6670c650-fefe-4b76-ac42-e3b7e60d10bf', '00a4e5aa-aeee-403f-af1c-1f8b058c4e12', 'VMS2026DZ000181', 'Blanc Nacre', '150cc • Air forcé • EFI', '2026-10-02', '2026-10-16', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-16T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('657fdd63-90fb-4f5b-ae54-b9bb87002276', 'efe00453-2df4-467f-a177-0484ee609660', '3f6f6575-5045-47c0-a7e2-ade1882ce203', 'VMS2026DZ000182', 'Gris Titane', '125cc • Liquide • EFI', '2026-10-01', '2026-10-15', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-15T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('68333e17-479a-4144-a2fe-d4bd82daa0a3', '8fa80271-7cbe-43f2-a6a1-49d0db410fa2', 'c80536ee-471f-4432-ab52-27ba8d3143fe', 'VMS2026DZ000183', 'Bleu Nuit', '500cc • Liquide • EFI Double Papillon', '2026-09-30', '2026-10-14', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-14T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('4d28cf30-c44e-40b0-aace-792628e8f6ca', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '2f39d314-009b-4140-a754-d370518155e7', 'VMS2026DZ000184', 'Rouge VMS Racing', '125cc • Air • Carburateur optimisé', '2026-07-21', '2026-08-04', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-08-04T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('bf96177b-6758-41a0-a50b-279a05de834b', '3b2af5ef-3d15-4188-a1a0-af7e7c841740', 'f4e92145-68b7-4af7-a672-343e85e5f413', 'VMS2026DZ000185', 'Jaune Sport', '150cc • Liquide • EFI Delphi', '2026-09-28', '2026-10-12', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-12T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('b677b3ab-08ed-42f4-ad5d-50cad40d8fe6', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', 'ddde321b-ba24-45cd-a181-6c726ffb3cab', 'VMS2026DZ000186', 'Noir Mat', '110cc • Air • Carburateur', '2026-09-27', '2026-10-11', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-11T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('6f96c874-669a-4bae-ad0c-92e1b6889387', '1cb3c954-cce8-4a24-a4d7-13ccc2022428', '318aa009-a953-4107-a027-41fc3e3379b1', 'VMS2026DZ000187', 'Blanc Nacre', '125cc • Air • Carburateur', '2026-09-26', '2026-10-10', 'in_transfer', 'Contrôle qualité VMS usine validé', NULL, '2026-10-10T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('fb0e7670-9593-4c47-ad11-d42d13d1d0e1', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', 'c13d2978-83d8-49b3-a4fe-93e92b1fc07f', 'VMS2026DZ000188', 'Gris Titane', '175cc • Liquide • EFI Bosch', '2026-07-17', '2026-07-31', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-07-31T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('abb80628-eb25-4ea3-a164-0202ffd36e61', '6670c650-fefe-4b76-ac42-e3b7e60d10bf', '4d07418a-529d-4f69-a3bb-55da145e018a', 'VMS2026DZ000189', 'Bleu Nuit', '150cc • Air forcé • EFI', '2026-09-24', '2026-10-08', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-08T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('3ee3e52c-57d2-453f-ab5f-81a218691e93', 'efe00453-2df4-467f-a177-0484ee609660', '5a00a329-92b0-48bb-a53b-2403b54a9696', 'VMS2026DZ000190', 'Rouge VMS Racing', '125cc • Liquide • EFI', '2026-09-23', '2026-10-07', 'sold', 'Contrôle qualité VMS usine validé', '2026-11-18', '2026-10-07T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('d24eb8de-4d3b-4f4b-a34f-d323e1cb5270', '8fa80271-7cbe-43f2-a6a1-49d0db410fa2', 'd6c883f8-c7df-4b55-a711-25fcc9a5cb13', 'VMS2026DZ000191', 'Jaune Sport', '500cc • Liquide • EFI Double Papillon', '2026-09-22', '2026-10-06', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-06T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('3fbea3e0-a844-4750-af77-d67d02b70154', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '24c1efb6-43f6-41f9-a1ae-8602a4ffb00b', 'VMS2026DZ000192', 'Noir Mat', '125cc • Air • Carburateur optimisé', '2026-07-13', '2026-07-27', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-07-27T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('c25f3c51-af25-4242-a29f-2c71691e74eb', '3b2af5ef-3d15-4188-a1a0-af7e7c841740', '437e31eb-4fec-4c07-a445-5844ff86bf98', 'VMS2026DZ000193', 'Blanc Nacre', '150cc • Liquide • EFI Delphi', '2026-09-20', '2026-10-04', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-04T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('b15f1033-7c15-4734-aa0c-12fe73eb3eda', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '7f3131b5-6b4c-4390-a01f-6e5ce2744647', 'VMS2026DZ000194', 'Gris Titane', '110cc • Air • Carburateur', '2026-09-19', '2026-10-03', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-03T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('844dbd40-8a1a-41ac-ab4a-fccff5fcdfec', '1cb3c954-cce8-4a24-a4d7-13ccc2022428', '6676117f-09a1-4fe6-ad91-c5be0787fe7a', 'VMS2026DZ000195', 'Bleu Nuit', '125cc • Air • Carburateur', '2026-09-18', '2026-10-02', 'reserved', 'Contrôle qualité VMS usine validé', NULL, '2026-10-02T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('7d2d63cf-6559-4af7-a767-c96209c22164', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '960b7501-9ca5-49cd-a5d2-2aec63e297cf', 'VMS2026DZ000196', 'Rouge VMS Racing', '175cc • Liquide • EFI Bosch', '2026-07-09', '2026-07-23', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-07-23T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('f644a501-3057-4ae5-af74-e5b9a5a1aaac', '6670c650-fefe-4b76-ac42-e3b7e60d10bf', 'edbb8233-80cb-4410-ae3f-65f0e5455e71', 'VMS2026DZ000197', 'Jaune Sport', '150cc • Air forcé • EFI', '2026-09-16', '2026-09-30', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-30T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('307091c1-018a-419c-a942-46cf18a30356', 'efe00453-2df4-467f-a177-0484ee609660', '9b57ebb3-4567-46dd-a03f-7833f6959606', 'VMS2026DZ000198', 'Noir Mat', '125cc • Liquide • EFI', '2026-09-15', '2026-09-29', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-29T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('40120146-9393-47f6-ae51-af35e9834f25', '8fa80271-7cbe-43f2-a6a1-49d0db410fa2', 'ced756da-4380-41b2-adad-65d1de43d461', 'VMS2026DZ000199', 'Blanc Nacre', '500cc • Liquide • EFI Double Papillon', '2026-09-14', '2026-09-28', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-28T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('e3fbe828-a82e-48a1-afea-e1045b210813', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '007d212c-d706-4db5-af1c-75bbf3eb35d9', 'VMS2026DZ000200', 'Gris Titane', '125cc • Air • Carburateur optimisé', '2026-07-05', '2026-07-19', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-07-19T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('89f8fca6-6e3b-496d-a1c6-555e9f14fe1f', '3b2af5ef-3d15-4188-a1a0-af7e7c841740', '04a0a795-3b9d-4fbb-a974-c98ef044a2ab', 'VMS2026DZ000201', 'Bleu Nuit', '150cc • Liquide • EFI Delphi', '2026-09-12', '2026-09-26', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-26T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('067979d4-7a6a-467c-aa32-1a636b64b409', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '472ef702-ed6d-4dea-aefe-8880c99dc9cd', 'VMS2026DZ000202', 'Rouge VMS Racing', '110cc • Air • Carburateur', '2026-09-11', '2026-09-25', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-25T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('004c06ca-676b-4557-a62d-66e2535bce14', '1cb3c954-cce8-4a24-a4d7-13ccc2022428', 'b0d23458-9fde-4915-aa61-865751368634', 'VMS2026DZ000203', 'Jaune Sport', '125cc • Air • Carburateur', '2026-09-10', '2026-09-24', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-24T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('012c42d8-dcff-48ab-a066-84d01eb8ff4a', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', 'd189e080-175c-4d64-ae46-cc884633d2f5', 'VMS2026DZ000204', 'Noir Mat', '175cc • Liquide • EFI Bosch', '2026-07-01', '2026-07-15', 'in_transfer', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-07-15T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('7cb8d368-4ffe-48bb-af7e-8a9a4af4bf1b', '6670c650-fefe-4b76-ac42-e3b7e60d10bf', 'fec556c3-9e83-4ab6-aeaf-2b446e6fed2c', 'VMS2026DZ000205', 'Blanc Nacre', '150cc • Air forcé • EFI', '2026-09-08', '2026-09-22', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-22T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('6d425e75-ff13-4ab8-a3f9-c4750d4209e0', 'efe00453-2df4-467f-a177-0484ee609660', '0cd6bd05-9568-49ac-a0bb-a9de9206e548', 'VMS2026DZ000206', 'Gris Titane', '125cc • Liquide • EFI', '2026-09-07', '2026-09-21', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-21T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('01eed90f-8f9f-4a9c-a84e-850a50beac68', '8fa80271-7cbe-43f2-a6a1-49d0db410fa2', 'dafa8f2d-2471-4a5d-a0c6-24cd172fa668', 'VMS2026DZ000207', 'Bleu Nuit', '500cc • Liquide • EFI Double Papillon', '2026-09-06', '2026-09-20', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-20T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('e49851ed-e26c-4730-a371-dad68099ffde', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '5e97063e-676f-49ad-a646-e1bd5f064dc9', 'VMS2026DZ000208', 'Rouge VMS Racing', '125cc • Air • Carburateur optimisé', '2026-06-27', '2026-07-11', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-07-11T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('cad9b939-88ef-4358-ad48-d014b0ff8356', '3b2af5ef-3d15-4188-a1a0-af7e7c841740', '98ea0cae-8457-4e21-aa3c-2ffccfbfe225', 'VMS2026DZ000209', 'Jaune Sport', '150cc • Liquide • EFI Delphi', '2026-09-04', '2026-09-18', 'sold', 'Contrôle qualité VMS usine validé', '2026-11-18', '2026-09-18T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('f08dbea5-472d-4f85-ac46-9baabb5a2925', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '3a9b57ca-bb33-4f1f-a31c-76ac0a20e1f4', 'VMS2026DZ000210', 'Noir Mat', '110cc • Air • Carburateur', '2026-09-03', '2026-09-17', 'reserved', 'Contrôle qualité VMS usine validé', NULL, '2026-09-17T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
ALTER TABLE motorcycles ENABLE TRIGGER after_motorcycle_status_available;
COMMIT;
