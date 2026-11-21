BEGIN;
ALTER TABLE motorcycles DISABLE TRIGGER after_motorcycle_status_available;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('3a58e854-13ac-4cb0-a5d1-16a23ebddb3c', '1cb3c954-cce8-4a24-a4d7-13ccc2022428', '4123be06-d726-48d3-a1e9-880e315bb8ce', 'VMS2026DZ000211', 'Blanc Nacre', '125cc • Air • Carburateur', '2026-09-02', '2026-09-16', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-16T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('253aa20f-3464-4e44-a82a-65cce7e8218b', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', 'dad48ee7-3b7a-4648-a6dc-c78bfadf9c8d', 'VMS2026DZ000212', 'Gris Titane', '175cc • Liquide • EFI Bosch', '2026-06-23', '2026-07-07', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-07-07T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('9f73ea69-5469-4ae4-a8b4-59c492f9ffd7', '6670c650-fefe-4b76-ac42-e3b7e60d10bf', 'f378804f-e6bf-424d-acaa-2fcd84b9edc4', 'VMS2026DZ000213', 'Bleu Nuit', '150cc • Air forcé • EFI', '2026-08-31', '2026-09-14', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-14T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('347aa757-264d-4262-ab2e-d1cf3e0784db', 'efe00453-2df4-467f-a177-0484ee609660', '34b0ef86-f8cb-4343-aa56-a859e85b3453', 'VMS2026DZ000214', 'Rouge VMS Racing', '125cc • Liquide • EFI', '2026-08-30', '2026-09-13', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-13T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('374b05a8-63a2-4753-a0cb-41520d176546', '8fa80271-7cbe-43f2-a6a1-49d0db410fa2', 'fc0b2cc8-e9b0-4f8c-a488-cae893ac865a', 'VMS2026DZ000215', 'Jaune Sport', '500cc • Liquide • EFI Double Papillon', '2026-08-29', '2026-09-12', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-12T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('546baa10-135b-4704-a1c8-1d836c702194', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', 'f7e49757-a156-4cae-ac34-3d95b3a5a07f', 'VMS2026DZ000216', 'Noir Mat', '125cc • Air • Carburateur optimisé', '2026-06-19', '2026-07-03', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-07-03T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('974e7e6b-b499-4858-a57e-a0d00d1bbbf1', '3b2af5ef-3d15-4188-a1a0-af7e7c841740', '26d2ced3-df2f-4678-a147-084eb4c49e74', 'VMS2026DZ000217', 'Blanc Nacre', '150cc • Liquide • EFI Delphi', '2026-08-27', '2026-09-10', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-10T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('bcd6c473-7819-49bd-a91d-1051e787db91', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '9f61311a-0570-45da-a139-1af7310ee621', 'VMS2026DZ000218', 'Gris Titane', '110cc • Air • Carburateur', '2026-08-26', '2026-09-09', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-09T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('d35ca805-afae-4695-aea6-e47a7fd445a4', '1cb3c954-cce8-4a24-a4d7-13ccc2022428', '6b9616e8-ee73-4bfb-ac35-3af33cfaa291', 'VMS2026DZ000219', 'Bleu Nuit', '125cc • Air • Carburateur', '2026-08-25', '2026-09-08', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-08T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('062b14ed-7f97-494e-a2dc-7dc6c164f8f7', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', 'b5999971-764e-4820-ac92-a9fcedac3ddd', 'VMS2026DZ000220', 'Rouge VMS Racing', '175cc • Liquide • EFI Bosch', '2026-06-15', '2026-06-29', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-06-29T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('b9d04201-fdc3-404b-a50e-e163513d8a5d', '6670c650-fefe-4b76-ac42-e3b7e60d10bf', 'f4218e19-c304-4edb-aada-99dcd48a5841', 'VMS2026DZ000221', 'Jaune Sport', '150cc • Air forcé • EFI', '2026-08-23', '2026-09-06', 'in_transfer', 'Contrôle qualité VMS usine validé', NULL, '2026-09-06T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('4fb511f1-0303-4420-a2ec-26517cf88331', 'efe00453-2df4-467f-a177-0484ee609660', '7d229d91-01ea-47a2-a575-3e287086a811', 'VMS2026DZ000222', 'Noir Mat', '125cc • Liquide • EFI', '2026-08-22', '2026-09-05', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-05T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('be61e9c1-58e7-41b2-a4b5-6c5aa88921a1', '8fa80271-7cbe-43f2-a6a1-49d0db410fa2', '93560a52-18cc-4497-a06f-7ee7890b1c47', 'VMS2026DZ000223', 'Blanc Nacre', '500cc • Liquide • EFI Double Papillon', '2026-08-21', '2026-09-04', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-04T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('696fbac5-03eb-4b73-a820-c23c8b4ce9f3', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', 'b424369f-e9ad-4839-a8e1-bd2baf669364', 'VMS2026DZ000224', 'Gris Titane', '125cc • Air • Carburateur optimisé', '2026-06-11', '2026-06-25', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-06-25T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('f6607148-9884-4260-a48d-4c85a04991fc', '3b2af5ef-3d15-4188-a1a0-af7e7c841740', 'f5efa6f8-3b54-4637-a6e3-487ce8f7ec9f', 'VMS2026DZ000225', 'Bleu Nuit', '150cc • Liquide • EFI Delphi', '2026-11-02', '2026-11-16', 'reserved', 'Contrôle qualité VMS usine validé', NULL, '2026-11-16T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('8892ee86-50db-4558-a874-f0e9ba535f1c', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '8ff16520-7741-4dc8-ab0b-609246f7cab8', 'VMS2026DZ000226', 'Rouge VMS Racing', '110cc • Air • Carburateur', '2026-11-01', '2026-11-15', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-15T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('29696955-4287-4dc4-aa7c-fe75cc1deffa', '1cb3c954-cce8-4a24-a4d7-13ccc2022428', 'b5eb4bf2-7163-4399-aebe-cb7d68396a1f', 'VMS2026DZ000227', 'Jaune Sport', '125cc • Air • Carburateur', '2026-10-31', '2026-11-14', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-14T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('28f734dd-3216-46d4-a381-209b5c82f8a4', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '706f9042-5247-4a7d-a617-8c2a3116d45d', 'VMS2026DZ000228', 'Noir Mat', '175cc • Liquide • EFI Bosch', '2026-06-07', '2026-06-21', 'sold', 'Stock dormant éligible Compte Global (>90j)', '2026-11-18', '2026-06-21T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('dcd7fa03-9a12-456a-ab24-c396b823eb25', '6670c650-fefe-4b76-ac42-e3b7e60d10bf', '8d9bc5c6-0173-432d-a16e-318ec32c2ebc', 'VMS2026DZ000229', 'Blanc Nacre', '150cc • Air forcé • EFI', '2026-10-29', '2026-11-12', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-12T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('267db411-7d46-4467-abd5-0d5f3b4a53a3', 'efe00453-2df4-467f-a177-0484ee609660', 'fa423083-354f-4fd7-af54-6d3cc4370276', 'VMS2026DZ000230', 'Gris Titane', '125cc • Liquide • EFI', '2026-10-28', '2026-11-11', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-11T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('b85dd368-d7ab-458f-afd4-188bf9523a21', '8fa80271-7cbe-43f2-a6a1-49d0db410fa2', '202c7f95-9694-4e2a-a7ca-8f72a327e96c', 'VMS2026DZ000231', 'Bleu Nuit', '500cc • Liquide • EFI Double Papillon', '2026-10-27', '2026-11-10', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-10T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('df26b060-80bc-49f3-ae60-7ba50886a1b3', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '95fecef8-36b9-4792-a84d-b72574928187', 'VMS2026DZ000232', 'Rouge VMS Racing', '125cc • Air • Carburateur optimisé', '2026-06-03', '2026-06-17', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-06-17T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('65c3bf57-a889-4432-a43b-c5c6bcfe7c80', '3b2af5ef-3d15-4188-a1a0-af7e7c841740', '681c3797-0542-472c-a879-fc278802c8d0', 'VMS2026DZ000233', 'Jaune Sport', '150cc • Liquide • EFI Delphi', '2026-10-25', '2026-11-08', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-08T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('dab7e513-9401-4df2-a385-5f831f597f05', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', 'aff8edac-6fca-49fd-a509-62c64bf4a7a2', 'VMS2026DZ000234', 'Noir Mat', '110cc • Air • Carburateur', '2026-10-24', '2026-11-07', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-07T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('ce06224c-0c56-42eb-aff2-fcbf5ddba5e9', '1cb3c954-cce8-4a24-a4d7-13ccc2022428', '0c1b8b25-ca33-40e2-a110-28bde506e2c8', 'VMS2026DZ000235', 'Blanc Nacre', '125cc • Air • Carburateur', '2026-10-23', '2026-11-06', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-06T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('1911ee6d-1c44-4b81-ae26-8a198d324b09', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '44a8212b-d633-4b1f-ac98-ab12de68bcd2', 'VMS2026DZ000236', 'Gris Titane', '175cc • Liquide • EFI Bosch', '2026-05-30', '2026-06-13', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-06-13T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('dd0a86fa-4715-4306-a8a2-bb65faf8f389', '6670c650-fefe-4b76-ac42-e3b7e60d10bf', '7e8227ea-92b3-4ff3-af75-2ba2956b6e54', 'VMS2026DZ000237', 'Bleu Nuit', '150cc • Air forcé • EFI', '2026-10-21', '2026-11-04', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-04T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('0729b90f-39c8-40d1-ab79-e5e260f38f9e', 'efe00453-2df4-467f-a177-0484ee609660', '5fd21885-958b-4486-a040-dbc06353a06b', 'VMS2026DZ000238', 'Rouge VMS Racing', '125cc • Liquide • EFI', '2026-10-20', '2026-11-03', 'in_transfer', 'Contrôle qualité VMS usine validé', NULL, '2026-11-03T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('6e2e6cf9-9f63-42e7-aaeb-b72f226a3579', '8fa80271-7cbe-43f2-a6a1-49d0db410fa2', 'ba4312b1-7ed3-4d02-a70c-9f64e10e93c6', 'VMS2026DZ000239', 'Jaune Sport', '500cc • Liquide • EFI Double Papillon', '2026-10-19', '2026-11-02', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-02T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('69035bbb-7e98-4b69-a855-154c5c9322f8', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', 'a1151a33-c181-4f15-ae21-d1143083fe9b', 'VMS2026DZ000240', 'Noir Mat', '125cc • Air • Carburateur optimisé', '2026-05-26', '2026-06-09', 'reserved', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-06-09T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('41c1592d-7669-4205-ad9b-ff82b0e0fd91', '3b2af5ef-3d15-4188-a1a0-af7e7c841740', '894255e4-c95e-4fd0-ac78-d99da96abdf5', 'VMS2026DZ000241', 'Blanc Nacre', '150cc • Liquide • EFI Delphi', '2026-10-17', '2026-10-31', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-31T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('a4548434-c70b-4e2e-adf0-ffa5344c35dc', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '888f1d4d-a5c8-45af-ac55-7bdd7a43a467', 'VMS2026DZ000242', 'Gris Titane', '110cc • Air • Carburateur', '2026-10-16', '2026-10-30', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-30T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('87b74a86-eced-46f3-a228-c7c159e4e435', '1cb3c954-cce8-4a24-a4d7-13ccc2022428', '0112ec21-a591-42ad-af2d-b766685906a0', 'VMS2026DZ000243', 'Bleu Nuit', '125cc • Air • Carburateur', '2026-10-15', '2026-10-29', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-29T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('cebd82be-fc9e-4851-a0ea-3b3f013a4b2b', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '81154d42-2237-4ddd-a95f-e70dd0795b96', 'VMS2026DZ000244', 'Rouge VMS Racing', '175cc • Liquide • EFI Bosch', '2026-05-22', '2026-06-05', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-06-05T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('159f04ad-40b1-4084-abf8-ecbe3d3e4d65', '6670c650-fefe-4b76-ac42-e3b7e60d10bf', 'c1e837c2-e597-445a-a434-3f431684505f', 'VMS2026DZ000245', 'Jaune Sport', '150cc • Air forcé • EFI', '2026-10-13', '2026-10-27', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-27T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('a241ae90-3883-41a7-a050-1be79614e52d', 'efe00453-2df4-467f-a177-0484ee609660', '2604f326-16d0-4e0d-a642-369d57b5baf3', 'VMS2026DZ000246', 'Noir Mat', '125cc • Liquide • EFI', '2026-10-12', '2026-10-26', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-26T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('689a208a-c774-48ee-ab98-fe2a69260f68', '8fa80271-7cbe-43f2-a6a1-49d0db410fa2', '690a1d9c-3454-48a9-a855-d96d4ebcfc63', 'VMS2026DZ000247', 'Blanc Nacre', '500cc • Liquide • EFI Double Papillon', '2026-10-11', '2026-10-25', 'sold', 'Contrôle qualité VMS usine validé', '2026-11-18', '2026-10-25T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('4f4e49ca-660b-484e-ae06-f4281c9b9d3f', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '88d541ce-eb77-491b-ac5a-a72f9e548772', 'VMS2026DZ000248', 'Gris Titane', '125cc • Air • Carburateur optimisé', '2026-05-18', '2026-06-01', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-06-01T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('906d25c5-f26e-4f59-a71f-9520d4d6e38d', '3b2af5ef-3d15-4188-a1a0-af7e7c841740', 'f5e1d4eb-cbc1-49dc-a6c7-b696f13675bf', 'VMS2026DZ000249', 'Bleu Nuit', '150cc • Liquide • EFI Delphi', '2026-10-09', '2026-10-23', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-23T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('617e2022-11f3-4d90-a2dc-80a752c132b9', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', 'c6ec9f5b-132d-41d9-a13d-3459935c3ade', 'VMS2026DZ000250', 'Rouge VMS Racing', '110cc • Air • Carburateur', '2026-10-08', '2026-10-22', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-22T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('0097750a-2490-4b3a-aef6-c796e528feee', '1cb3c954-cce8-4a24-a4d7-13ccc2022428', '37f82d93-cafd-4f41-af5f-1508b0b3b8f9', 'VMS2026DZ000251', 'Jaune Sport', '125cc • Air • Carburateur', '2026-10-07', '2026-10-21', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-21T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('8919322b-4367-40c7-ab62-d7a2e7cea2a7', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', 'e9de928b-17a6-44e6-ae14-0942fb6fa85c', 'VMS2026DZ000252', 'Noir Mat', '175cc • Liquide • EFI Bosch', '2026-05-14', '2026-05-28', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-05-28T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('83c85b8e-20f8-4191-a109-640fff3221a6', '6670c650-fefe-4b76-ac42-e3b7e60d10bf', '4074181c-2e0e-4a3f-aedc-871b250b89a5', 'VMS2026DZ000253', 'Blanc Nacre', '150cc • Air forcé • EFI', '2026-10-05', '2026-10-19', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-19T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('d9e6bd06-9038-4671-a806-e04ab3222e22', 'efe00453-2df4-467f-a177-0484ee609660', '20abf9d5-4a87-4a53-a1df-3589f9e9e9c6', 'VMS2026DZ000254', 'Gris Titane', '125cc • Liquide • EFI', '2026-10-04', '2026-10-18', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-18T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('ad2782d1-65d3-4999-ad7c-0a2900538b4d', '8fa80271-7cbe-43f2-a6a1-49d0db410fa2', '654a20b5-3c93-47e1-aa05-b9cb364e463f', 'VMS2026DZ000255', 'Bleu Nuit', '500cc • Liquide • EFI Double Papillon', '2026-10-03', '2026-10-17', 'reserved', 'Contrôle qualité VMS usine validé', NULL, '2026-10-17T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('f65e155c-d707-42eb-aa31-41b0b774182f', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', 'c4ad5610-eefc-4d85-ab1b-be67e397aeb6', 'VMS2026DZ000256', 'Rouge VMS Racing', '125cc • Air • Carburateur optimisé', '2026-08-03', '2026-08-17', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-08-17T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('4adf8164-0e6b-42e7-a6b6-1acf3fa56277', '3b2af5ef-3d15-4188-a1a0-af7e7c841740', 'c70bbe23-02c5-486e-ab34-be528137d4df', 'VMS2026DZ000257', 'Jaune Sport', '150cc • Liquide • EFI Delphi', '2026-10-01', '2026-10-15', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-15T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('031de673-8456-414e-abec-80be9f7a085b', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '21db1b6e-f688-4a53-ac97-e05973bbda8d', 'VMS2026DZ000258', 'Noir Mat', '110cc • Air • Carburateur', '2026-09-30', '2026-10-14', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-14T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('854f7717-64e5-4eaf-a366-ec33e816aa01', '1cb3c954-cce8-4a24-a4d7-13ccc2022428', '256f8a1b-b5e7-4991-a728-02b869440477', 'VMS2026DZ000259', 'Blanc Nacre', '125cc • Air • Carburateur', '2026-09-29', '2026-10-13', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-13T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('c67692f0-6346-439d-a5f5-8acf3d326966', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', 'bc78aed8-b4b8-4716-abf9-2cd78cdb1660', 'VMS2026DZ000260', 'Gris Titane', '175cc • Liquide • EFI Bosch', '2026-07-30', '2026-08-13', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-08-13T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('221d3f13-c5ef-4faa-a988-40d0b9ba4e38', '6670c650-fefe-4b76-ac42-e3b7e60d10bf', '00a4e5aa-aeee-403f-af1c-1f8b058c4e12', 'VMS2026DZ000261', 'Bleu Nuit', '150cc • Air forcé • EFI', '2026-09-27', '2026-10-11', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-11T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('dc27d433-c188-4bc3-aaff-f2f277ef5372', 'efe00453-2df4-467f-a177-0484ee609660', '3f6f6575-5045-47c0-a7e2-ade1882ce203', 'VMS2026DZ000262', 'Rouge VMS Racing', '125cc • Liquide • EFI', '2026-09-26', '2026-10-10', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-10T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('d955aa85-00db-481c-a530-11eedfa2c060', '8fa80271-7cbe-43f2-a6a1-49d0db410fa2', 'c80536ee-471f-4432-ab52-27ba8d3143fe', 'VMS2026DZ000263', 'Jaune Sport', '500cc • Liquide • EFI Double Papillon', '2026-09-25', '2026-10-09', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-09T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('59d13a9d-0310-411a-a287-bcfe77d04c50', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '2f39d314-009b-4140-a754-d370518155e7', 'VMS2026DZ000264', 'Noir Mat', '125cc • Air • Carburateur optimisé', '2026-07-26', '2026-08-09', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-08-09T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('2095d39b-0063-43b2-a42b-6f62a90a0b6d', '3b2af5ef-3d15-4188-a1a0-af7e7c841740', 'f4e92145-68b7-4af7-a672-343e85e5f413', 'VMS2026DZ000265', 'Blanc Nacre', '150cc • Liquide • EFI Delphi', '2026-09-23', '2026-10-07', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-07T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('5742f006-b9ab-4376-a898-9917974118af', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', 'ddde321b-ba24-45cd-a181-6c726ffb3cab', 'VMS2026DZ000266', 'Gris Titane', '110cc • Air • Carburateur', '2026-09-22', '2026-10-06', 'sold', 'Contrôle qualité VMS usine validé', '2026-11-18', '2026-10-06T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('f39dca8f-1630-4ab8-a9a0-86a33d0dcf7c', '1cb3c954-cce8-4a24-a4d7-13ccc2022428', '318aa009-a953-4107-a027-41fc3e3379b1', 'VMS2026DZ000267', 'Bleu Nuit', '125cc • Air • Carburateur', '2026-09-21', '2026-10-05', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-05T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('1b0c2751-94ee-411b-ac2d-8aaaf5e9e2cf', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', 'c13d2978-83d8-49b3-a4fe-93e92b1fc07f', 'VMS2026DZ000268', 'Rouge VMS Racing', '175cc • Liquide • EFI Bosch', '2026-07-22', '2026-08-05', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-08-05T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('67aaa57b-af68-4b6c-a6a1-1cee6edf4b87', '6670c650-fefe-4b76-ac42-e3b7e60d10bf', '4d07418a-529d-4f69-a3bb-55da145e018a', 'VMS2026DZ000269', 'Jaune Sport', '150cc • Air forcé • EFI', '2026-09-19', '2026-10-03', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-03T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('d0b8d958-e067-4a04-a9b1-32ad1494cec5', 'efe00453-2df4-467f-a177-0484ee609660', '5a00a329-92b0-48bb-a53b-2403b54a9696', 'VMS2026DZ000270', 'Noir Mat', '125cc • Liquide • EFI', '2026-09-18', '2026-10-02', 'reserved', 'Contrôle qualité VMS usine validé', NULL, '2026-10-02T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('ac846da6-03bd-4474-aaa0-529503144dbc', '8fa80271-7cbe-43f2-a6a1-49d0db410fa2', 'd6c883f8-c7df-4b55-a711-25fcc9a5cb13', 'VMS2026DZ000271', 'Blanc Nacre', '500cc • Liquide • EFI Double Papillon', '2026-09-17', '2026-10-01', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-01T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('3e0508a2-a8d2-4992-aaeb-80ea4ff677e8', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '24c1efb6-43f6-41f9-a1ae-8602a4ffb00b', 'VMS2026DZ000272', 'Gris Titane', '125cc • Air • Carburateur optimisé', '2026-07-18', '2026-08-01', 'in_transfer', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-08-01T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('463ee757-2d42-4692-a62a-c11561e7d845', '3b2af5ef-3d15-4188-a1a0-af7e7c841740', '437e31eb-4fec-4c07-a445-5844ff86bf98', 'VMS2026DZ000273', 'Bleu Nuit', '150cc • Liquide • EFI Delphi', '2026-09-15', '2026-09-29', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-29T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('0b7a2792-99c0-47b2-a785-4782980da4e6', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '7f3131b5-6b4c-4390-a01f-6e5ce2744647', 'VMS2026DZ000274', 'Rouge VMS Racing', '110cc • Air • Carburateur', '2026-09-14', '2026-09-28', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-28T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('eccb8bdf-4549-40f0-af5c-05443040ea08', '1cb3c954-cce8-4a24-a4d7-13ccc2022428', '6676117f-09a1-4fe6-ad91-c5be0787fe7a', 'VMS2026DZ000275', 'Jaune Sport', '125cc • Air • Carburateur', '2026-09-13', '2026-09-27', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-27T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('e1d24278-416d-4b45-ab6d-773e179c9d96', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '960b7501-9ca5-49cd-a5d2-2aec63e297cf', 'VMS2026DZ000276', 'Noir Mat', '175cc • Liquide • EFI Bosch', '2026-07-14', '2026-07-28', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-07-28T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('05b38f17-9ca6-4165-a9ea-43eea73571b2', '6670c650-fefe-4b76-ac42-e3b7e60d10bf', 'edbb8233-80cb-4410-ae3f-65f0e5455e71', 'VMS2026DZ000277', 'Blanc Nacre', '150cc • Air forcé • EFI', '2026-09-11', '2026-09-25', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-25T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('de33d6bd-e60a-482b-aa65-86b7e0974d06', 'efe00453-2df4-467f-a177-0484ee609660', '9b57ebb3-4567-46dd-a03f-7833f6959606', 'VMS2026DZ000278', 'Gris Titane', '125cc • Liquide • EFI', '2026-09-10', '2026-09-24', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-24T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('209ee001-318e-46bc-a768-4264c819850a', '8fa80271-7cbe-43f2-a6a1-49d0db410fa2', 'ced756da-4380-41b2-adad-65d1de43d461', 'VMS2026DZ000279', 'Bleu Nuit', '500cc • Liquide • EFI Double Papillon', '2026-09-09', '2026-09-23', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-23T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('65a9a54a-69f8-455e-aac9-3764df2ae0ad', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '007d212c-d706-4db5-af1c-75bbf3eb35d9', 'VMS2026DZ000280', 'Rouge VMS Racing', '125cc • Air • Carburateur optimisé', '2026-07-10', '2026-07-24', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-07-24T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('0d8718d4-cb28-4e1b-a0df-0dad1ff80c75', '3b2af5ef-3d15-4188-a1a0-af7e7c841740', '04a0a795-3b9d-4fbb-a974-c98ef044a2ab', 'VMS2026DZ000281', 'Jaune Sport', '150cc • Liquide • EFI Delphi', '2026-09-07', '2026-09-21', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-21T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('1063bf86-7e1b-4281-a987-7817f993f852', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '472ef702-ed6d-4dea-aefe-8880c99dc9cd', 'VMS2026DZ000282', 'Noir Mat', '110cc • Air • Carburateur', '2026-09-06', '2026-09-20', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-20T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('5793cc96-e98a-47c0-a6bf-db81d29c2b65', '1cb3c954-cce8-4a24-a4d7-13ccc2022428', 'b0d23458-9fde-4915-aa61-865751368634', 'VMS2026DZ000283', 'Blanc Nacre', '125cc • Air • Carburateur', '2026-09-05', '2026-09-19', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-19T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('23fedd52-b6a4-4a7a-a65d-aad524b4d8b7', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', 'd189e080-175c-4d64-ae46-cc884633d2f5', 'VMS2026DZ000284', 'Gris Titane', '175cc • Liquide • EFI Bosch', '2026-07-06', '2026-07-20', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-07-20T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('93b16a46-1d14-44f4-a190-7d528938a51e', '6670c650-fefe-4b76-ac42-e3b7e60d10bf', 'fec556c3-9e83-4ab6-aeaf-2b446e6fed2c', 'VMS2026DZ000285', 'Bleu Nuit', '150cc • Air forcé • EFI', '2026-09-03', '2026-09-17', 'reserved', 'Contrôle qualité VMS usine validé', NULL, '2026-09-17T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('b4537fc4-0cd5-409d-a144-646f3795e65c', 'efe00453-2df4-467f-a177-0484ee609660', '0cd6bd05-9568-49ac-a0bb-a9de9206e548', 'VMS2026DZ000286', 'Rouge VMS Racing', '125cc • Liquide • EFI', '2026-09-02', '2026-09-16', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-16T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('26f8cf2f-aaa5-4afa-a2cb-17a580bd2236', '8fa80271-7cbe-43f2-a6a1-49d0db410fa2', 'dafa8f2d-2471-4a5d-a0c6-24cd172fa668', 'VMS2026DZ000287', 'Jaune Sport', '500cc • Liquide • EFI Double Papillon', '2026-09-01', '2026-09-15', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-15T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('93a33f88-e1b9-43d3-aa51-8a4449cf3b6f', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '5e97063e-676f-49ad-a646-e1bd5f064dc9', 'VMS2026DZ000288', 'Noir Mat', '125cc • Air • Carburateur optimisé', '2026-07-02', '2026-07-16', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-07-16T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('04efe006-3a5f-4bf8-ad5b-234f7dfaba06', '3b2af5ef-3d15-4188-a1a0-af7e7c841740', '98ea0cae-8457-4e21-aa3c-2ffccfbfe225', 'VMS2026DZ000289', 'Blanc Nacre', '150cc • Liquide • EFI Delphi', '2026-08-30', '2026-09-13', 'in_transfer', 'Contrôle qualité VMS usine validé', NULL, '2026-09-13T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('9844d392-43a0-453a-a3dd-a4ea65065bb2', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '3a9b57ca-bb33-4f1f-a31c-76ac0a20e1f4', 'VMS2026DZ000290', 'Gris Titane', '110cc • Air • Carburateur', '2026-08-29', '2026-09-12', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-12T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('b1681874-6239-4a88-a704-387f50609f11', '1cb3c954-cce8-4a24-a4d7-13ccc2022428', '4123be06-d726-48d3-a1e9-880e315bb8ce', 'VMS2026DZ000291', 'Bleu Nuit', '125cc • Air • Carburateur', '2026-08-28', '2026-09-11', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-11T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('0209ca55-f88a-429f-a9be-6f68ea13f766', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', 'dad48ee7-3b7a-4648-a6dc-c78bfadf9c8d', 'VMS2026DZ000292', 'Rouge VMS Racing', '175cc • Liquide • EFI Bosch', '2026-06-28', '2026-07-12', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-07-12T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('56ac1f6b-9e58-4995-a397-57f384382f58', '6670c650-fefe-4b76-ac42-e3b7e60d10bf', 'f378804f-e6bf-424d-acaa-2fcd84b9edc4', 'VMS2026DZ000293', 'Jaune Sport', '150cc • Air forcé • EFI', '2026-08-26', '2026-09-09', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-09T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('fe200972-39c8-4ada-a5cb-2edaff0b7ca5', 'efe00453-2df4-467f-a177-0484ee609660', '34b0ef86-f8cb-4343-aa56-a859e85b3453', 'VMS2026DZ000294', 'Noir Mat', '125cc • Liquide • EFI', '2026-08-25', '2026-09-08', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-08T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('f979d3f9-1fcf-4aa4-ab84-fe4b7e22a82f', '8fa80271-7cbe-43f2-a6a1-49d0db410fa2', 'fc0b2cc8-e9b0-4f8c-a488-cae893ac865a', 'VMS2026DZ000295', 'Blanc Nacre', '500cc • Liquide • EFI Double Papillon', '2026-08-24', '2026-09-07', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-07T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('a28541a4-d553-4c53-a814-d2940a727e68', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', 'f7e49757-a156-4cae-ac34-3d95b3a5a07f', 'VMS2026DZ000296', 'Gris Titane', '125cc • Air • Carburateur optimisé', '2026-06-24', '2026-07-08', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-07-08T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('0372936a-f7d7-4d88-aec2-fbf07ba77dbe', '3b2af5ef-3d15-4188-a1a0-af7e7c841740', '26d2ced3-df2f-4678-a147-084eb4c49e74', 'VMS2026DZ000297', 'Bleu Nuit', '150cc • Liquide • EFI Delphi', '2026-08-22', '2026-09-05', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-05T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('69a62134-2faa-42fb-ad81-a7b6ca0a0ab9', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '9f61311a-0570-45da-a139-1af7310ee621', 'VMS2026DZ000298', 'Rouge VMS Racing', '110cc • Air • Carburateur', '2026-08-21', '2026-09-04', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-04T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('cbf20689-72ad-43fb-a8af-dc9399d5bfbf', '1cb3c954-cce8-4a24-a4d7-13ccc2022428', '6b9616e8-ee73-4bfb-ac35-3af33cfaa291', 'VMS2026DZ000299', 'Jaune Sport', '125cc • Air • Carburateur', '2026-08-20', '2026-09-03', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-03T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('3fa45fbb-d9fa-4d96-ae59-b9767449637c', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', 'b5999971-764e-4820-ac92-a9fcedac3ddd', 'VMS2026DZ000300', 'Noir Mat', '175cc • Liquide • EFI Bosch', '2026-06-20', '2026-07-04', 'reserved', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-07-04T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('755b8a72-763c-4a76-aadd-3f83ed000f32', '6670c650-fefe-4b76-ac42-e3b7e60d10bf', 'f4218e19-c304-4edb-aada-99dcd48a5841', 'VMS2026DZ000301', 'Blanc Nacre', '150cc • Air forcé • EFI', '2026-11-01', '2026-11-15', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-15T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('1be339ae-36d2-4558-a2e4-6a0dc7c5a387', 'efe00453-2df4-467f-a177-0484ee609660', '7d229d91-01ea-47a2-a575-3e287086a811', 'VMS2026DZ000302', 'Gris Titane', '125cc • Liquide • EFI', '2026-10-31', '2026-11-14', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-14T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('c5751c7e-bb43-41e9-ae15-820e533feec4', '8fa80271-7cbe-43f2-a6a1-49d0db410fa2', '93560a52-18cc-4497-a06f-7ee7890b1c47', 'VMS2026DZ000303', 'Bleu Nuit', '500cc • Liquide • EFI Double Papillon', '2026-10-30', '2026-11-13', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-13T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('177f4083-caf4-4bec-a912-7151c44099ac', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', 'b424369f-e9ad-4839-a8e1-bd2baf669364', 'VMS2026DZ000304', 'Rouge VMS Racing', '125cc • Air • Carburateur optimisé', '2026-06-16', '2026-06-30', 'sold', 'Stock dormant éligible Compte Global (>90j)', '2026-11-18', '2026-06-30T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('ae7583b3-1ccb-4db8-adc4-8a9ca3c71df0', '3b2af5ef-3d15-4188-a1a0-af7e7c841740', 'f5efa6f8-3b54-4637-a6e3-487ce8f7ec9f', 'VMS2026DZ000305', 'Jaune Sport', '150cc • Liquide • EFI Delphi', '2026-10-28', '2026-11-11', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-11T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('db6997f8-0953-477c-a08c-b9b5650ddbb2', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '8ff16520-7741-4dc8-ab0b-609246f7cab8', 'VMS2026DZ000306', 'Noir Mat', '110cc • Air • Carburateur', '2026-10-27', '2026-11-10', 'in_transfer', 'Contrôle qualité VMS usine validé', NULL, '2026-11-10T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('18d2971f-8183-4783-adfc-769e4b00b3e7', '1cb3c954-cce8-4a24-a4d7-13ccc2022428', 'b5eb4bf2-7163-4399-aebe-cb7d68396a1f', 'VMS2026DZ000307', 'Blanc Nacre', '125cc • Air • Carburateur', '2026-10-26', '2026-11-09', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-09T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('d0b12722-871f-4a12-a614-cc0bf83de57b', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '706f9042-5247-4a7d-a617-8c2a3116d45d', 'VMS2026DZ000308', 'Gris Titane', '175cc • Liquide • EFI Bosch', '2026-06-12', '2026-06-26', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-06-26T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('5bb58d19-35af-4bde-a0a7-11e0003be69c', '6670c650-fefe-4b76-ac42-e3b7e60d10bf', '8d9bc5c6-0173-432d-a16e-318ec32c2ebc', 'VMS2026DZ000309', 'Bleu Nuit', '150cc • Air forcé • EFI', '2026-10-24', '2026-11-07', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-07T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('da269b0d-f04f-40a9-aa55-9089e4270351', 'efe00453-2df4-467f-a177-0484ee609660', 'fa423083-354f-4fd7-af54-6d3cc4370276', 'VMS2026DZ000310', 'Rouge VMS Racing', '125cc • Liquide • EFI', '2026-10-23', '2026-11-06', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-06T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('40fd5a55-1bd9-44db-a87f-571c4d16ddb1', '8fa80271-7cbe-43f2-a6a1-49d0db410fa2', '202c7f95-9694-4e2a-a7ca-8f72a327e96c', 'VMS2026DZ000311', 'Jaune Sport', '500cc • Liquide • EFI Double Papillon', '2026-10-22', '2026-11-05', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-05T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('0857dac4-e02a-48d5-ab1b-7e92271e5211', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '95fecef8-36b9-4792-a84d-b72574928187', 'VMS2026DZ000312', 'Noir Mat', '125cc • Air • Carburateur optimisé', '2026-06-08', '2026-06-22', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-06-22T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('d797f027-8301-423b-a77b-cfef8596bd3a', '3b2af5ef-3d15-4188-a1a0-af7e7c841740', '681c3797-0542-472c-a879-fc278802c8d0', 'VMS2026DZ000313', 'Blanc Nacre', '150cc • Liquide • EFI Delphi', '2026-10-20', '2026-11-03', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-03T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('65d8ff68-214d-4509-ac76-f9ce209d9f3c', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', 'aff8edac-6fca-49fd-a509-62c64bf4a7a2', 'VMS2026DZ000314', 'Gris Titane', '110cc • Air • Carburateur', '2026-10-19', '2026-11-02', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-02T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('4ad3a48c-627f-41be-a3bc-3546647d7759', '1cb3c954-cce8-4a24-a4d7-13ccc2022428', '0c1b8b25-ca33-40e2-a110-28bde506e2c8', 'VMS2026DZ000315', 'Bleu Nuit', '125cc • Air • Carburateur', '2026-10-18', '2026-11-01', 'reserved', 'Contrôle qualité VMS usine validé', NULL, '2026-11-01T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('64728864-366c-4294-a05f-b97a2751e928', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '44a8212b-d633-4b1f-ac98-ab12de68bcd2', 'VMS2026DZ000316', 'Rouge VMS Racing', '175cc • Liquide • EFI Bosch', '2026-06-04', '2026-06-18', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-06-18T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('00a63118-1f22-4657-acc2-027ed1201f5d', '6670c650-fefe-4b76-ac42-e3b7e60d10bf', '7e8227ea-92b3-4ff3-af75-2ba2956b6e54', 'VMS2026DZ000317', 'Jaune Sport', '150cc • Air forcé • EFI', '2026-10-16', '2026-10-30', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-30T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('0c2f4dbc-9874-4f88-a7a0-192937a41ee2', 'efe00453-2df4-467f-a177-0484ee609660', '5fd21885-958b-4486-a040-dbc06353a06b', 'VMS2026DZ000318', 'Noir Mat', '125cc • Liquide • EFI', '2026-10-15', '2026-10-29', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-29T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('67a48703-3e30-4b4a-af01-f96bb79dbb2b', '8fa80271-7cbe-43f2-a6a1-49d0db410fa2', 'ba4312b1-7ed3-4d02-a70c-9f64e10e93c6', 'VMS2026DZ000319', 'Blanc Nacre', '500cc • Liquide • EFI Double Papillon', '2026-10-14', '2026-10-28', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-28T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('abf879eb-f9e3-4f5b-a794-87cda21ba134', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', 'a1151a33-c181-4f15-ae21-d1143083fe9b', 'VMS2026DZ000320', 'Gris Titane', '125cc • Air • Carburateur optimisé', '2026-05-31', '2026-06-14', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-06-14T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('b7b661e7-19b1-4330-adc9-6e8a231de531', '3b2af5ef-3d15-4188-a1a0-af7e7c841740', '894255e4-c95e-4fd0-ac78-d99da96abdf5', 'VMS2026DZ000321', 'Bleu Nuit', '150cc • Liquide • EFI Delphi', '2026-10-12', '2026-10-26', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-26T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('a5532ed8-a999-411d-a9e3-faa2451c719d', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '888f1d4d-a5c8-45af-ac55-7bdd7a43a467', 'VMS2026DZ000322', 'Rouge VMS Racing', '110cc • Air • Carburateur', '2026-10-11', '2026-10-25', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-25T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('88a3b6eb-2435-4584-ad93-7654275408e8', '1cb3c954-cce8-4a24-a4d7-13ccc2022428', '0112ec21-a591-42ad-af2d-b766685906a0', 'VMS2026DZ000323', 'Jaune Sport', '125cc • Air • Carburateur', '2026-10-10', '2026-10-24', 'in_transfer', 'Contrôle qualité VMS usine validé', NULL, '2026-10-24T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('c9b35f06-3129-407f-a271-aed27c1368b1', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '81154d42-2237-4ddd-a95f-e70dd0795b96', 'VMS2026DZ000324', 'Noir Mat', '175cc • Liquide • EFI Bosch', '2026-05-27', '2026-06-10', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-06-10T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('b6214119-5e7a-47fd-a2b3-5f48c0dc58c9', '6670c650-fefe-4b76-ac42-e3b7e60d10bf', 'c1e837c2-e597-445a-a434-3f431684505f', 'VMS2026DZ000325', 'Blanc Nacre', '150cc • Air forcé • EFI', '2026-10-08', '2026-10-22', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-22T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('f6a38a8f-2204-4c47-a850-9018ed4269b8', 'efe00453-2df4-467f-a177-0484ee609660', '2604f326-16d0-4e0d-a642-369d57b5baf3', 'VMS2026DZ000326', 'Gris Titane', '125cc • Liquide • EFI', '2026-10-07', '2026-10-21', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-21T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('38addab1-9d3e-4175-abe8-ba8bf8042c6f', '8fa80271-7cbe-43f2-a6a1-49d0db410fa2', '690a1d9c-3454-48a9-a855-d96d4ebcfc63', 'VMS2026DZ000327', 'Bleu Nuit', '500cc • Liquide • EFI Double Papillon', '2026-10-06', '2026-10-20', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-20T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('98368540-442f-45a0-a62e-ffb4ba09a24c', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '88d541ce-eb77-491b-ac5a-a72f9e548772', 'VMS2026DZ000328', 'Rouge VMS Racing', '125cc • Air • Carburateur optimisé', '2026-05-23', '2026-06-06', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-06-06T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('8dfeb602-8ff8-44c1-a350-229853190c2d', '3b2af5ef-3d15-4188-a1a0-af7e7c841740', 'f5e1d4eb-cbc1-49dc-a6c7-b696f13675bf', 'VMS2026DZ000329', 'Jaune Sport', '150cc • Liquide • EFI Delphi', '2026-10-04', '2026-10-18', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-18T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('bd92624e-70e7-433b-aefe-5d7d8e116180', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', 'c6ec9f5b-132d-41d9-a13d-3459935c3ade', 'VMS2026DZ000330', 'Noir Mat', '110cc • Air • Carburateur', '2026-10-03', '2026-10-17', 'reserved', 'Contrôle qualité VMS usine validé', NULL, '2026-10-17T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('93082335-56ad-459a-ab44-8bba9b30d004', '1cb3c954-cce8-4a24-a4d7-13ccc2022428', '37f82d93-cafd-4f41-af5f-1508b0b3b8f9', 'VMS2026DZ000331', 'Blanc Nacre', '125cc • Air • Carburateur', '2026-10-02', '2026-10-16', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-16T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('d9c7e693-0b1f-4ded-a4b8-c82f8ec57466', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', 'e9de928b-17a6-44e6-ae14-0942fb6fa85c', 'VMS2026DZ000332', 'Gris Titane', '175cc • Liquide • EFI Bosch', '2026-05-19', '2026-06-02', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-06-02T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('44ae730b-6f79-4d5b-a7ce-fe18488b205a', '6670c650-fefe-4b76-ac42-e3b7e60d10bf', '4074181c-2e0e-4a3f-aedc-871b250b89a5', 'VMS2026DZ000333', 'Bleu Nuit', '150cc • Air forcé • EFI', '2026-09-30', '2026-10-14', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-14T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('c8dfc2c1-0627-49d7-a3b6-97a0e9ac3d1d', 'efe00453-2df4-467f-a177-0484ee609660', '20abf9d5-4a87-4a53-a1df-3589f9e9e9c6', 'VMS2026DZ000334', 'Rouge VMS Racing', '125cc • Liquide • EFI', '2026-09-29', '2026-10-13', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-13T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('3abadebf-35af-4e0f-abf4-bd67adf8c192', '8fa80271-7cbe-43f2-a6a1-49d0db410fa2', '654a20b5-3c93-47e1-aa05-b9cb364e463f', 'VMS2026DZ000335', 'Jaune Sport', '500cc • Liquide • EFI Double Papillon', '2026-09-28', '2026-10-12', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-12T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('5d13ddcf-5167-4b1d-ab22-0107663f4c9e', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', 'c4ad5610-eefc-4d85-ab1b-be67e397aeb6', 'VMS2026DZ000336', 'Noir Mat', '125cc • Air • Carburateur optimisé', '2026-05-15', '2026-05-29', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-05-29T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('88c7683b-e028-41ba-acc8-cdd0ee2175f3', '3b2af5ef-3d15-4188-a1a0-af7e7c841740', 'c70bbe23-02c5-486e-ab34-be528137d4df', 'VMS2026DZ000337', 'Blanc Nacre', '150cc • Liquide • EFI Delphi', '2026-09-26', '2026-10-10', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-10T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('92bf4bf0-70f9-4780-a55a-fba00c5b4433', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '21db1b6e-f688-4a53-ac97-e05973bbda8d', 'VMS2026DZ000338', 'Gris Titane', '110cc • Air • Carburateur', '2026-09-25', '2026-10-09', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-09T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('e525d472-d3e5-4923-a5f1-5b720b63f202', '1cb3c954-cce8-4a24-a4d7-13ccc2022428', '256f8a1b-b5e7-4991-a728-02b869440477', 'VMS2026DZ000339', 'Bleu Nuit', '125cc • Air • Carburateur', '2026-09-24', '2026-10-08', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-08T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('48802eba-0915-45ca-a4bd-1efccaaa3ac9', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', 'bc78aed8-b4b8-4716-abf9-2cd78cdb1660', 'VMS2026DZ000340', 'Rouge VMS Racing', '175cc • Liquide • EFI Bosch', '2026-08-04', '2026-08-18', 'in_transfer', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-08-18T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('3767fa83-bf19-4a97-a2f2-328038f97696', '6670c650-fefe-4b76-ac42-e3b7e60d10bf', '00a4e5aa-aeee-403f-af1c-1f8b058c4e12', 'VMS2026DZ000341', 'Jaune Sport', '150cc • Air forcé • EFI', '2026-09-22', '2026-10-06', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-06T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('ee84bec1-fdfd-42f6-a87b-3f2711b2a89d', 'efe00453-2df4-467f-a177-0484ee609660', '3f6f6575-5045-47c0-a7e2-ade1882ce203', 'VMS2026DZ000342', 'Noir Mat', '125cc • Liquide • EFI', '2026-09-21', '2026-10-05', 'sold', 'Contrôle qualité VMS usine validé', '2026-11-18', '2026-10-05T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('21163efa-427e-421c-aea8-45b7a86aa135', '8fa80271-7cbe-43f2-a6a1-49d0db410fa2', 'c80536ee-471f-4432-ab52-27ba8d3143fe', 'VMS2026DZ000343', 'Blanc Nacre', '500cc • Liquide • EFI Double Papillon', '2026-09-20', '2026-10-04', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-04T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('a107f493-b3cb-4d36-ac9c-2e166afd7552', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '2f39d314-009b-4140-a754-d370518155e7', 'VMS2026DZ000344', 'Gris Titane', '125cc • Air • Carburateur optimisé', '2026-07-31', '2026-08-14', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-08-14T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('35e9582f-bed6-4306-a47d-bee19a745b3e', '3b2af5ef-3d15-4188-a1a0-af7e7c841740', 'f4e92145-68b7-4af7-a672-343e85e5f413', 'VMS2026DZ000345', 'Bleu Nuit', '150cc • Liquide • EFI Delphi', '2026-09-18', '2026-10-02', 'reserved', 'Contrôle qualité VMS usine validé', NULL, '2026-10-02T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('dc8766a4-4df8-40e9-a68b-cbcf1beb84f9', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', 'ddde321b-ba24-45cd-a181-6c726ffb3cab', 'VMS2026DZ000346', 'Rouge VMS Racing', '110cc • Air • Carburateur', '2026-09-17', '2026-10-01', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-01T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('af0fc65e-c7b5-40d7-a322-a67969f7f82b', '1cb3c954-cce8-4a24-a4d7-13ccc2022428', '318aa009-a953-4107-a027-41fc3e3379b1', 'VMS2026DZ000347', 'Jaune Sport', '125cc • Air • Carburateur', '2026-09-16', '2026-09-30', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-30T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('55947f50-1065-4a3c-adb9-d75138e7888c', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', 'c13d2978-83d8-49b3-a4fe-93e92b1fc07f', 'VMS2026DZ000348', 'Noir Mat', '175cc • Liquide • EFI Bosch', '2026-07-27', '2026-08-10', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-08-10T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('801424be-fcd7-4d3c-a1ed-3a41339ca671', '6670c650-fefe-4b76-ac42-e3b7e60d10bf', '4d07418a-529d-4f69-a3bb-55da145e018a', 'VMS2026DZ000349', 'Blanc Nacre', '150cc • Air forcé • EFI', '2026-09-14', '2026-09-28', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-28T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('a4200224-7b90-4d18-aa3b-9464a051687a', 'efe00453-2df4-467f-a177-0484ee609660', '5a00a329-92b0-48bb-a53b-2403b54a9696', 'VMS2026DZ000350', 'Gris Titane', '125cc • Liquide • EFI', '2026-09-13', '2026-09-27', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-27T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('eeadf691-4b39-4617-a594-830b04fd5816', '8fa80271-7cbe-43f2-a6a1-49d0db410fa2', 'd6c883f8-c7df-4b55-a711-25fcc9a5cb13', 'VMS2026DZ000351', 'Bleu Nuit', '500cc • Liquide • EFI Double Papillon', '2026-09-12', '2026-09-26', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-26T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('529b4e57-da4c-44c3-a1ba-60d7884059e9', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '24c1efb6-43f6-41f9-a1ae-8602a4ffb00b', 'VMS2026DZ000352', 'Rouge VMS Racing', '125cc • Air • Carburateur optimisé', '2026-07-23', '2026-08-06', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-08-06T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('2e25cb0e-3534-49cf-a0cf-5e344b067977', '3b2af5ef-3d15-4188-a1a0-af7e7c841740', '437e31eb-4fec-4c07-a445-5844ff86bf98', 'VMS2026DZ000353', 'Jaune Sport', '150cc • Liquide • EFI Delphi', '2026-09-10', '2026-09-24', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-24T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('f85f3b19-4fcf-40c7-ae40-8cdce5768906', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '7f3131b5-6b4c-4390-a01f-6e5ce2744647', 'VMS2026DZ000354', 'Noir Mat', '110cc • Air • Carburateur', '2026-09-09', '2026-09-23', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-23T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('5d50cdf7-f3fc-49bd-a642-229e7390c40c', '1cb3c954-cce8-4a24-a4d7-13ccc2022428', '6676117f-09a1-4fe6-ad91-c5be0787fe7a', 'VMS2026DZ000355', 'Blanc Nacre', '125cc • Air • Carburateur', '2026-09-08', '2026-09-22', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-22T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('ac2d4182-0c5c-43b4-a7cd-b1a55d29a053', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '960b7501-9ca5-49cd-a5d2-2aec63e297cf', 'VMS2026DZ000356', 'Gris Titane', '175cc • Liquide • EFI Bosch', '2026-07-19', '2026-08-02', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-08-02T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('2ca2bde8-f93a-4fa8-a391-cb4d91c528ff', '6670c650-fefe-4b76-ac42-e3b7e60d10bf', 'edbb8233-80cb-4410-ae3f-65f0e5455e71', 'VMS2026DZ000357', 'Bleu Nuit', '150cc • Air forcé • EFI', '2026-09-06', '2026-09-20', 'in_transfer', 'Contrôle qualité VMS usine validé', NULL, '2026-09-20T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('2e43261e-a30b-480e-a0a9-31f78cadc218', 'efe00453-2df4-467f-a177-0484ee609660', '9b57ebb3-4567-46dd-a03f-7833f6959606', 'VMS2026DZ000358', 'Rouge VMS Racing', '125cc • Liquide • EFI', '2026-09-05', '2026-09-19', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-19T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('c75649f4-5674-44ae-ad07-cef2328ba13d', '8fa80271-7cbe-43f2-a6a1-49d0db410fa2', 'ced756da-4380-41b2-adad-65d1de43d461', 'VMS2026DZ000359', 'Jaune Sport', '500cc • Liquide • EFI Double Papillon', '2026-09-04', '2026-09-18', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-18T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('bb944dd2-4a1c-47b8-a6ce-79588fd50a4f', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '007d212c-d706-4db5-af1c-75bbf3eb35d9', 'VMS2026DZ000360', 'Noir Mat', '125cc • Air • Carburateur optimisé', '2026-07-15', '2026-07-29', 'reserved', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-07-29T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('4ccc7f32-fe81-4f02-a68e-3c453b89ba2c', '3b2af5ef-3d15-4188-a1a0-af7e7c841740', '04a0a795-3b9d-4fbb-a974-c98ef044a2ab', 'VMS2026DZ000361', 'Blanc Nacre', '150cc • Liquide • EFI Delphi', '2026-09-02', '2026-09-16', 'sold', 'Contrôle qualité VMS usine validé', '2026-11-18', '2026-09-16T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('12fc7153-69cc-46ec-ad6e-f4211b56e9e8', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '472ef702-ed6d-4dea-aefe-8880c99dc9cd', 'VMS2026DZ000362', 'Gris Titane', '110cc • Air • Carburateur', '2026-09-01', '2026-09-15', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-15T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('6c5a4731-9dd5-4849-ad7d-9b4a6253d366', '1cb3c954-cce8-4a24-a4d7-13ccc2022428', 'b0d23458-9fde-4915-aa61-865751368634', 'VMS2026DZ000363', 'Bleu Nuit', '125cc • Air • Carburateur', '2026-08-31', '2026-09-14', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-14T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('a66703a8-b285-4da2-a053-ba8cfe8df57d', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', 'd189e080-175c-4d64-ae46-cc884633d2f5', 'VMS2026DZ000364', 'Rouge VMS Racing', '175cc • Liquide • EFI Bosch', '2026-07-11', '2026-07-25', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-07-25T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('b0290e29-21fe-44ed-aef0-b4e59b0aae3c', '6670c650-fefe-4b76-ac42-e3b7e60d10bf', 'fec556c3-9e83-4ab6-aeaf-2b446e6fed2c', 'VMS2026DZ000365', 'Jaune Sport', '150cc • Air forcé • EFI', '2026-08-29', '2026-09-12', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-12T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('9dfe7d35-73ac-4f60-a105-f8d7743b06a3', 'efe00453-2df4-467f-a177-0484ee609660', '0cd6bd05-9568-49ac-a0bb-a9de9206e548', 'VMS2026DZ000366', 'Noir Mat', '125cc • Liquide • EFI', '2026-08-28', '2026-09-11', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-11T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('d00b92d3-5a33-4034-a42b-39dab887825c', '8fa80271-7cbe-43f2-a6a1-49d0db410fa2', 'dafa8f2d-2471-4a5d-a0c6-24cd172fa668', 'VMS2026DZ000367', 'Blanc Nacre', '500cc • Liquide • EFI Double Papillon', '2026-08-27', '2026-09-10', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-10T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('4bbca308-ba0e-4af3-a5e2-31399e6fd640', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '5e97063e-676f-49ad-a646-e1bd5f064dc9', 'VMS2026DZ000368', 'Gris Titane', '125cc • Air • Carburateur optimisé', '2026-07-07', '2026-07-21', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-07-21T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('38c367a1-0c55-4198-a61f-1c8903f73611', '3b2af5ef-3d15-4188-a1a0-af7e7c841740', '98ea0cae-8457-4e21-aa3c-2ffccfbfe225', 'VMS2026DZ000369', 'Bleu Nuit', '150cc • Liquide • EFI Delphi', '2026-08-25', '2026-09-08', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-08T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('91a84c67-88d9-4cfd-a7be-82e4d58c3db8', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '3a9b57ca-bb33-4f1f-a31c-76ac0a20e1f4', 'VMS2026DZ000370', 'Rouge VMS Racing', '110cc • Air • Carburateur', '2026-08-24', '2026-09-07', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-07T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('5f061179-1317-4904-af85-a1ca825d8818', '1cb3c954-cce8-4a24-a4d7-13ccc2022428', '4123be06-d726-48d3-a1e9-880e315bb8ce', 'VMS2026DZ000371', 'Jaune Sport', '125cc • Air • Carburateur', '2026-08-23', '2026-09-06', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-06T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('01ac5c6d-b749-49c7-a49f-ad520fd6178a', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', 'dad48ee7-3b7a-4648-a6dc-c78bfadf9c8d', 'VMS2026DZ000372', 'Noir Mat', '175cc • Liquide • EFI Bosch', '2026-07-03', '2026-07-17', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-07-17T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('9021bb7c-b696-413c-a2fc-e02eb14876fe', '6670c650-fefe-4b76-ac42-e3b7e60d10bf', 'f378804f-e6bf-424d-acaa-2fcd84b9edc4', 'VMS2026DZ000373', 'Blanc Nacre', '150cc • Air forcé • EFI', '2026-08-21', '2026-09-04', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-09-04T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('eb47d6c6-6990-4205-a228-27dd82037500', 'efe00453-2df4-467f-a177-0484ee609660', '34b0ef86-f8cb-4343-aa56-a859e85b3453', 'VMS2026DZ000374', 'Gris Titane', '125cc • Liquide • EFI', '2026-08-20', '2026-09-03', 'in_transfer', 'Contrôle qualité VMS usine validé', NULL, '2026-09-03T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('1cec8c9f-aa90-417b-adb1-dac89561220b', '8fa80271-7cbe-43f2-a6a1-49d0db410fa2', 'fc0b2cc8-e9b0-4f8c-a488-cae893ac865a', 'VMS2026DZ000375', 'Bleu Nuit', '500cc • Liquide • EFI Double Papillon', '2026-11-02', '2026-11-16', 'reserved', 'Contrôle qualité VMS usine validé', NULL, '2026-11-16T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('ac1daaad-cc1b-4d96-a3c0-386b0744241d', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', 'f7e49757-a156-4cae-ac34-3d95b3a5a07f', 'VMS2026DZ000376', 'Rouge VMS Racing', '125cc • Air • Carburateur optimisé', '2026-06-29', '2026-07-13', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-07-13T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('922f6691-9f2f-4b36-a26f-988104a847c1', '3b2af5ef-3d15-4188-a1a0-af7e7c841740', '26d2ced3-df2f-4678-a147-084eb4c49e74', 'VMS2026DZ000377', 'Jaune Sport', '150cc • Liquide • EFI Delphi', '2026-10-31', '2026-11-14', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-14T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('aadb0399-035c-4151-a860-d7b9dce20999', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '9f61311a-0570-45da-a139-1af7310ee621', 'VMS2026DZ000378', 'Noir Mat', '110cc • Air • Carburateur', '2026-10-30', '2026-11-13', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-13T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('0fd0dd37-fc44-45cc-afe4-64c9f506d041', '1cb3c954-cce8-4a24-a4d7-13ccc2022428', '6b9616e8-ee73-4bfb-ac35-3af33cfaa291', 'VMS2026DZ000379', 'Blanc Nacre', '125cc • Air • Carburateur', '2026-10-29', '2026-11-12', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-12T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('e93f7a5a-a44a-428b-a5e1-f6df9e57f198', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', 'b5999971-764e-4820-ac92-a9fcedac3ddd', 'VMS2026DZ000380', 'Gris Titane', '175cc • Liquide • EFI Bosch', '2026-06-25', '2026-07-09', 'sold', 'Stock dormant éligible Compte Global (>90j)', '2026-11-18', '2026-07-09T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('5ca5e43b-129e-4950-a1d2-9c373db82557', '6670c650-fefe-4b76-ac42-e3b7e60d10bf', 'f4218e19-c304-4edb-aada-99dcd48a5841', 'VMS2026DZ000381', 'Bleu Nuit', '150cc • Air forcé • EFI', '2026-10-27', '2026-11-10', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-10T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('6454572c-e58f-4f75-a968-e5b38dd14970', 'efe00453-2df4-467f-a177-0484ee609660', '7d229d91-01ea-47a2-a575-3e287086a811', 'VMS2026DZ000382', 'Rouge VMS Racing', '125cc • Liquide • EFI', '2026-10-26', '2026-11-09', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-09T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('2407135a-b8a6-4081-aaf6-a1fe5ce2f91e', '8fa80271-7cbe-43f2-a6a1-49d0db410fa2', '93560a52-18cc-4497-a06f-7ee7890b1c47', 'VMS2026DZ000383', 'Jaune Sport', '500cc • Liquide • EFI Double Papillon', '2026-10-25', '2026-11-08', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-08T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('7f66c168-cf79-4af4-a93f-48fd3b486243', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', 'b424369f-e9ad-4839-a8e1-bd2baf669364', 'VMS2026DZ000384', 'Noir Mat', '125cc • Air • Carburateur optimisé', '2026-06-21', '2026-07-05', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-07-05T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('ed170009-86c6-49e4-a9fe-9008892cbf64', '3b2af5ef-3d15-4188-a1a0-af7e7c841740', 'f5efa6f8-3b54-4637-a6e3-487ce8f7ec9f', 'VMS2026DZ000385', 'Blanc Nacre', '150cc • Liquide • EFI Delphi', '2026-10-23', '2026-11-06', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-06T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('47aa7eeb-fa4f-451c-af8a-1613d50c4a7c', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '8ff16520-7741-4dc8-ab0b-609246f7cab8', 'VMS2026DZ000386', 'Gris Titane', '110cc • Air • Carburateur', '2026-10-22', '2026-11-05', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-05T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('47a7484c-b344-4e66-af3e-49e77b3a5730', '1cb3c954-cce8-4a24-a4d7-13ccc2022428', 'b5eb4bf2-7163-4399-aebe-cb7d68396a1f', 'VMS2026DZ000387', 'Bleu Nuit', '125cc • Air • Carburateur', '2026-10-21', '2026-11-04', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-04T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('33681dfc-5aa8-4501-acf9-82b1b044db0a', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '706f9042-5247-4a7d-a617-8c2a3116d45d', 'VMS2026DZ000388', 'Rouge VMS Racing', '175cc • Liquide • EFI Bosch', '2026-06-17', '2026-07-01', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-07-01T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('bb17996e-94b7-45b3-a2df-312187a5c02c', '6670c650-fefe-4b76-ac42-e3b7e60d10bf', '8d9bc5c6-0173-432d-a16e-318ec32c2ebc', 'VMS2026DZ000389', 'Jaune Sport', '150cc • Air forcé • EFI', '2026-10-19', '2026-11-02', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-11-02T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('3eb23b53-6f25-495c-abaf-115e25a4b157', 'efe00453-2df4-467f-a177-0484ee609660', 'fa423083-354f-4fd7-af54-6d3cc4370276', 'VMS2026DZ000390', 'Noir Mat', '125cc • Liquide • EFI', '2026-10-18', '2026-11-01', 'reserved', 'Contrôle qualité VMS usine validé', NULL, '2026-11-01T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('16da44d7-e863-4999-a50b-190f2faa14c0', '8fa80271-7cbe-43f2-a6a1-49d0db410fa2', '202c7f95-9694-4e2a-a7ca-8f72a327e96c', 'VMS2026DZ000391', 'Blanc Nacre', '500cc • Liquide • EFI Double Papillon', '2026-10-17', '2026-10-31', 'in_transfer', 'Contrôle qualité VMS usine validé', NULL, '2026-10-31T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('e8823681-527a-48f1-a075-19f1c9835009', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '95fecef8-36b9-4792-a84d-b72574928187', 'VMS2026DZ000392', 'Gris Titane', '125cc • Air • Carburateur optimisé', '2026-06-13', '2026-06-27', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-06-27T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('6b579106-23d0-4ec2-aacc-5728532f891f', '3b2af5ef-3d15-4188-a1a0-af7e7c841740', '681c3797-0542-472c-a879-fc278802c8d0', 'VMS2026DZ000393', 'Bleu Nuit', '150cc • Liquide • EFI Delphi', '2026-10-15', '2026-10-29', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-29T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('3eda2bc4-c0f6-4283-adb5-5c67caf39ce7', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', 'aff8edac-6fca-49fd-a509-62c64bf4a7a2', 'VMS2026DZ000394', 'Rouge VMS Racing', '110cc • Air • Carburateur', '2026-10-14', '2026-10-28', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-28T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('e4aa391e-29c4-4df4-ab6f-253c180d2b14', '1cb3c954-cce8-4a24-a4d7-13ccc2022428', '0c1b8b25-ca33-40e2-a110-28bde506e2c8', 'VMS2026DZ000395', 'Jaune Sport', '125cc • Air • Carburateur', '2026-10-13', '2026-10-27', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-27T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('646f30bd-a990-4bb1-a951-ec87a9bbcaa8', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '44a8212b-d633-4b1f-ac98-ab12de68bcd2', 'VMS2026DZ000396', 'Noir Mat', '175cc • Liquide • EFI Bosch', '2026-06-09', '2026-06-23', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-06-23T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('ca5e5977-36e4-4b9b-a28e-deb479605ebb', '6670c650-fefe-4b76-ac42-e3b7e60d10bf', '7e8227ea-92b3-4ff3-af75-2ba2956b6e54', 'VMS2026DZ000397', 'Blanc Nacre', '150cc • Air forcé • EFI', '2026-10-11', '2026-10-25', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-25T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('5a8222d8-b2cf-4821-afec-dd698bab82b1', 'efe00453-2df4-467f-a177-0484ee609660', '5fd21885-958b-4486-a040-dbc06353a06b', 'VMS2026DZ000398', 'Gris Titane', '125cc • Liquide • EFI', '2026-10-10', '2026-10-24', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-24T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('81b764ce-72ee-4297-a9d1-e38ae74205f9', '8fa80271-7cbe-43f2-a6a1-49d0db410fa2', 'ba4312b1-7ed3-4d02-a70c-9f64e10e93c6', 'VMS2026DZ000399', 'Bleu Nuit', '500cc • Liquide • EFI Double Papillon', '2026-10-09', '2026-10-23', 'sold', 'Contrôle qualité VMS usine validé', '2026-11-18', '2026-10-23T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('3c74b182-59bb-43a6-afea-0502afbe416a', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', 'a1151a33-c181-4f15-ae21-d1143083fe9b', 'VMS2026DZ000400', 'Rouge VMS Racing', '125cc • Air • Carburateur optimisé', '2026-06-05', '2026-06-19', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-06-19T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('7977ad16-7568-4278-a077-ea5c332ff307', '3b2af5ef-3d15-4188-a1a0-af7e7c841740', '894255e4-c95e-4fd0-ac78-d99da96abdf5', 'VMS2026DZ000401', 'Jaune Sport', '150cc • Liquide • EFI Delphi', '2026-10-07', '2026-10-21', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-21T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('58b8f109-389f-4c35-a3e1-bc73fa5bbae3', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '888f1d4d-a5c8-45af-ac55-7bdd7a43a467', 'VMS2026DZ000402', 'Noir Mat', '110cc • Air • Carburateur', '2026-10-06', '2026-10-20', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-20T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('d6678daf-c288-42db-ae3c-51ea66c7975c', '1cb3c954-cce8-4a24-a4d7-13ccc2022428', '0112ec21-a591-42ad-af2d-b766685906a0', 'VMS2026DZ000403', 'Blanc Nacre', '125cc • Air • Carburateur', '2026-10-05', '2026-10-19', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-19T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('cdff9b6b-6c9a-42a4-a82b-9048c4d479d8', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '81154d42-2237-4ddd-a95f-e70dd0795b96', 'VMS2026DZ000404', 'Gris Titane', '175cc • Liquide • EFI Bosch', '2026-06-01', '2026-06-15', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-06-15T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('26540d99-b2dc-4566-ae72-34bf5bb5155f', '6670c650-fefe-4b76-ac42-e3b7e60d10bf', 'c1e837c2-e597-445a-a434-3f431684505f', 'VMS2026DZ000405', 'Bleu Nuit', '150cc • Air forcé • EFI', '2026-10-03', '2026-10-17', 'reserved', 'Contrôle qualité VMS usine validé', NULL, '2026-10-17T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('61675590-cdbe-4b73-a300-e006e8ff84b5', 'efe00453-2df4-467f-a177-0484ee609660', '2604f326-16d0-4e0d-a642-369d57b5baf3', 'VMS2026DZ000406', 'Rouge VMS Racing', '125cc • Liquide • EFI', '2026-10-02', '2026-10-16', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-16T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('68136837-a41f-4b73-a329-ea42d84fdff3', '8fa80271-7cbe-43f2-a6a1-49d0db410fa2', '690a1d9c-3454-48a9-a855-d96d4ebcfc63', 'VMS2026DZ000407', 'Jaune Sport', '500cc • Liquide • EFI Double Papillon', '2026-10-01', '2026-10-15', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-15T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('94223e69-01bc-4f1b-adb3-d8861c2ff003', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '88d541ce-eb77-491b-ac5a-a72f9e548772', 'VMS2026DZ000408', 'Noir Mat', '125cc • Air • Carburateur optimisé', '2026-05-28', '2026-06-11', 'in_transfer', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-06-11T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('7fd7e5aa-c7a9-4250-ac34-b886f85217ff', '3b2af5ef-3d15-4188-a1a0-af7e7c841740', 'f5e1d4eb-cbc1-49dc-a6c7-b696f13675bf', 'VMS2026DZ000409', 'Blanc Nacre', '150cc • Liquide • EFI Delphi', '2026-09-29', '2026-10-13', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-13T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('d7047b87-383a-4545-a5aa-2e0095110aee', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', 'c6ec9f5b-132d-41d9-a13d-3459935c3ade', 'VMS2026DZ000410', 'Gris Titane', '110cc • Air • Carburateur', '2026-09-28', '2026-10-12', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-12T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('88538391-d7b6-43b5-aeab-f18cbc50edd1', '1cb3c954-cce8-4a24-a4d7-13ccc2022428', '37f82d93-cafd-4f41-af5f-1508b0b3b8f9', 'VMS2026DZ000411', 'Bleu Nuit', '125cc • Air • Carburateur', '2026-09-27', '2026-10-11', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-11T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('b92c29b7-13ac-4ca4-ad6c-f04c3f48be58', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', 'e9de928b-17a6-44e6-ae14-0942fb6fa85c', 'VMS2026DZ000412', 'Rouge VMS Racing', '175cc • Liquide • EFI Bosch', '2026-05-24', '2026-06-07', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-06-07T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('eab11d13-c506-4b8d-aebd-fd8c383f6c3c', '6670c650-fefe-4b76-ac42-e3b7e60d10bf', '4074181c-2e0e-4a3f-aedc-871b250b89a5', 'VMS2026DZ000413', 'Jaune Sport', '150cc • Air forcé • EFI', '2026-09-25', '2026-10-09', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-09T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('ee275838-0f4f-44ec-a91d-dd64944afe82', 'efe00453-2df4-467f-a177-0484ee609660', '20abf9d5-4a87-4a53-a1df-3589f9e9e9c6', 'VMS2026DZ000414', 'Noir Mat', '125cc • Liquide • EFI', '2026-09-24', '2026-10-08', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-08T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('9c6c98fc-fbd7-4994-a07a-e2c7f862fefa', '8fa80271-7cbe-43f2-a6a1-49d0db410fa2', '654a20b5-3c93-47e1-aa05-b9cb364e463f', 'VMS2026DZ000415', 'Blanc Nacre', '500cc • Liquide • EFI Double Papillon', '2026-09-23', '2026-10-07', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-07T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('694094b1-5c95-4b40-aba5-309cff6ccb76', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', 'c4ad5610-eefc-4d85-ab1b-be67e397aeb6', 'VMS2026DZ000416', 'Gris Titane', '125cc • Air • Carburateur optimisé', '2026-05-20', '2026-06-03', 'available', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-06-03T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('a30b7158-1771-43c2-a0e3-8e9901f786e6', '3b2af5ef-3d15-4188-a1a0-af7e7c841740', 'c70bbe23-02c5-486e-ab34-be528137d4df', 'VMS2026DZ000417', 'Bleu Nuit', '150cc • Liquide • EFI Delphi', '2026-09-21', '2026-10-05', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-05T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('b5276759-c70b-4cbb-aa3a-c18c00a29b45', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '21db1b6e-f688-4a53-ac97-e05973bbda8d', 'VMS2026DZ000418', 'Rouge VMS Racing', '110cc • Air • Carburateur', '2026-09-20', '2026-10-04', 'sold', 'Contrôle qualité VMS usine validé', '2026-11-18', '2026-10-04T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('2a3c76ad-b83f-4701-aee4-1feb75c28506', '1cb3c954-cce8-4a24-a4d7-13ccc2022428', '256f8a1b-b5e7-4991-a728-02b869440477', 'VMS2026DZ000419', 'Jaune Sport', '125cc • Air • Carburateur', '2026-09-19', '2026-10-03', 'available', 'Contrôle qualité VMS usine validé', NULL, '2026-10-03T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)
VALUES ('7a18c05c-0586-4860-acf1-8351623416f4', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', 'bc78aed8-b4b8-4716-abf9-2cd78cdb1660', 'VMS2026DZ000420', 'Noir Mat', '175cc • Liquide • EFI Bosch', '2026-05-16', '2026-05-30', 'reserved', 'Stock dormant éligible Compte Global (>90j)', NULL, '2026-05-30T14:48:55.983Z')
ON CONFLICT (vin) DO NOTHING;
ALTER TABLE motorcycles ENABLE TRIGGER after_motorcycle_status_available;
COMMIT;
