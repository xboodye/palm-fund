/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: plantedpalmtrees
 * Interface for PlantedPalmTrees
 */
export interface PlantedPalmTrees {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  palmTreePhoto?: string;
  /** @wixFieldType text */
  donorName?: string;
  /** @wixFieldType text */
  donationId?: string;
  /** @wixFieldType date */
  plantingDate?: Date | string;
  /** @wixFieldType text */
  treeDescription?: string;
}
