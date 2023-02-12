-- Retrieves resource ids and their associated tags
-- TO DELETE LATER

SELECT resources.id as resource_id, tags.topic as tags
FROM tags
JOIN resources ON resources.id = resource_id
GROUP BY resources.id, tags.topic
ORDER BY resource_id;