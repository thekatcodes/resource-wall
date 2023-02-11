INSERT into resources (owner_id, title, description, cover_image_url)
VALUES (1, 'The tech world is starting to use ChatGPT', 'programming jobs are over', 'https://cdn-bdfbc.nitrocdn.com/mpQHUpeCagYMmyclYzWrEuJOvwEOajTJ/assets/static/optimized/rev-33edbce/wp-content/uploads/2022/12/cover7-1080x675.jpg'),
(2, 'OMG YOU WILL NEVER BELIEVE THIS', 'CRAZIEST THING THAT ACTUALLY HAPPENED', 'https://www.gardendesign.com/pictures/images/675x529Max/site_3/helianthus-yellow-flower-pixabay_11863.jpg'),
(3, 'Ten study tips you need to start doing', 'how to be productive in ten easy steps', 'https://www.incimages.com/uploaded_files/image/1920x1080/getty_655998316_2000149920009280207_354374.jpg'),
(4, 'Five food restaurants to head out to', 'these are the best food places in the world', 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');

INSERT into tags (resource_id, topic)
VALUES (1, 'programming'),
(1, 'coding'),
(2, 'fun'),
(2, 'crazy'),
(3, 'study'),
(3, 'education'),
(3, 'school'),
(3, 'learning'),
(4, 'food');

INSERT into favourites (resource_id, user_id, liked) 
VALUES (1 , 3, true),
(1, 5, true),
(2, 1, true),
(2, 3, true),
(2, 6, true),
(3, 1, true),
(3, 4, true),
(4, 1, true);

INSERT into ratings (resource_id, user_id, rating)
VALUES (1, 3, 5),
(1, 2, 3),
(2, 1, 4),
(3, 6, 1),
(4, 5, 2);

INSERT into comments (resource_id, user_id, message)
VALUES (1, 2, 'wow'),
(2, 5, 'amazing'),
(3, 1, 'really informative'),
(4, 6, 'this content sucks man');
