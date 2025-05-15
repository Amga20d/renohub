-- Widgets table seeds here (Example)
INSERT INTO Projects (user_id, title, description, budget, address, status, created_at) VALUES (1,'Help fix my roof','My roof needs fixing', 2000, '123 place steet', '2025-06-13 11:10:50');
INSERT INTO Projects (user_id, title, description, budget, address, status, created_at) VALUES (1,'Help fix my wall','Now my wall needs fixing', 1500, '456 place steet ', '2025-07-19 12:01:20');

INSERT INTO Projects_images(1,'url/path/project1/image1','image text', '2025-06-13 11:01:20')
INSERT INTO Projects_images(1,'url/path/project1/image2','image text', '2025-06-13 11:05:20')

INSERT INTO Projects_images(2,'url/path/project2/image1','image text', '2025-07-19 12:01:20')
INSERT INTO Projects_images(2,'url/path/project2/image2','image text', '2025-07-19 12:05:50')
